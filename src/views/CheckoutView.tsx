import { useEffect, useState } from "react";
import { clearCart, decrementPerson, incrementPerson, setPerson, setSubtotal, useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";
import { useLangStore } from "../stores/langStore";
import { useNavigate } from "react-router-dom";
import { articlesPrincipal, articlesSupplement, articlesBoisson, methods, SHIPPING_RATE, TAX } from "../core/constants";
import { useAuthStore } from "../stores/useAuthStore";
import { modal, toast } from "../stores/appStore";
import AddPersonModal from "../components/AddPersonModal";
import RemovePersonModal from "../components/RemovePersonModal";
import RecapSection from "../components/RecapSection";
import PaymentSection from "../components/PaymentSection";
import LoaderComponent from "../components/LoaderComponent";
import { createCommand, createHistory } from "../stores/historyStore";

const CheckoutView = () => {
  const { theme } = useThemeStore();
  const { cart, subtotal, dates, events, persons, checkedDays, startDate } = useCartStore();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    paymentMethod: '',
    promoCode: '',
    address: '',
    persons: persons || [],
  });
  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const commandId = createCommand({
      ...form,
      weeks: dates?.length || 0,
      checkedDays: checkedDays,
      startDate: startDate,
      subtotal: subtotal,
      shipping: SHIPPING_RATE * (dates?.length || 0),
      tax: TAX,
      total: subtotal + SHIPPING_RATE * (dates?.length || 0) + TAX,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'paid',
    });
    createHistory(commandId, events || []);
    modal.open(<LoaderComponent counter={1500} callback={() => {
      toast.success('Commande effectuée avec succès');
      setLoading(false)
      clearCart();
      modal.close();
      navigate('/'+lang+'/client/orders');
    }} />);
  };

  useEffect(() => {
    if (!user?.email) return;
    if (!persons?.length || !persons?.includes(user?.email)) {
      setPerson([user?.email || '']);
    }
  }, [user?.email, persons]);

  useEffect(() => {
    setSubtotal(articlesPrincipal, articlesSupplement, articlesBoisson);
  }, [cart]);

  const addPerson = (): void => {
    modal.open(
      <AddPersonModal 
        onSubmit={email => { incrementPerson(email); modal.close(); }}
        onCancel={() => modal.close()}
      />
    );
  };
  const removePerson = (email: string): void => {
    modal.open(
      <RemovePersonModal 
        email={email}
        onConfirm={() => { decrementPerson(email); modal.close(); }}
        onCancel={() => modal.close()}
      />
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
      <div className="row">
        <div className="col-lg-8">
        <RecapSection 
          cart={cart}
          persons={persons || []}
          events={events}
          user={user}
          theme={theme}
          subtotal={subtotal}
          dates={dates}
          shipping={SHIPPING_RATE * (dates?.length || 0)}
          tax={TAX}
          addPerson={addPerson}
          removePerson={removePerson}
        />
      </div>
      <div className="col-lg-4">
        <PaymentSection 
          persons={persons || []}
          form={form}
          handleChange={handleChange}
          methods={methods}
          theme={theme}
          loading={loading}
          handlePay={handlePay}
          addPerson={addPerson}
        />
      </div>
    </div>
  );
};

export default CheckoutView;