import { useEffect, useState } from "react";
import { clearCart, decrementPerson, incrementPerson, setPerson, setSubtotal, useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";
import { useLangStore } from "../stores/langStore";
import { useNavigate } from "react-router-dom";
import { methods, SHIPPING_RATE, TAX } from "../core/constants";
import { useAuthStore } from "../stores/useAuthStore";
import { modal, toast } from "../stores/appStore";
import AddPersonModal from "../components/AddPersonModal";
import RemovePersonModal from "../components/RemovePersonModal";
import RecapSection from "../components/RecapSection";
import PaymentSection from "../components/PaymentSection";
import { addHistory, useHistoryStore } from "../stores/historyStore";

const CheckoutView = () => {
  const { theme } = useThemeStore();
  const { cart, subtotal, dates, events, persons } = useCartStore();
  const { history } = useHistoryStore();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const shipping = SHIPPING_RATE * (dates?.length || 0);
  const tax = TAX;
  const total = subtotal + shipping + tax;

  const [form, setForm] = useState({
    paymentMethod: '',
    promoCode: '',
    address: '',
    persons: persons || [],
  });
  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addHistory({
        events: events || [],
        users: persons || [],
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod: form.paymentMethod,
        promoCode: form.promoCode,
        address: form.address,
        id: history?.length || 0,
      });
      clearCart();
      setLoading(false);
      toast.success('Commande effectuée avec succès');
      navigate('/'+lang+'/client/orders');
    }, 1500);
  };
  useEffect(() => {
    if (!user?.email) return;
    if (persons?.includes(user?.email)) return;
    if (!persons) {
      setPerson([user?.email || '']);
    }
  }, [user?.email, persons]);

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
  useEffect(() => {
    setSubtotal();
  }, [cart]);

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
          shipping={shipping}
          tax={tax}
          total={total}
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