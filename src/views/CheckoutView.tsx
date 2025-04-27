import { useEffect, useState } from "react";
import { clearCart, decrementPerson, incrementPerson, setPerson, setSubtotal, useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";
import { useLangStore } from "../stores/langStore";
import { Link } from "react-router-dom";
import { methods } from "../core/constants";
import { useAuthStore } from "../stores/useAuthStore";
import { modal } from "../stores/appStore";
import AddPersonModal from "../components/AddPersonModal";
import RemovePersonModal from "../components/RemovePersonModal";
import RecapSection from "../components/RecapSection";
import PaymentSection from "../components/PaymentSection";

// Constants
const SHIPPING_RATE = 500.0;
const TAX = 20.0;

const CheckoutView = () => {
  const { theme } = useThemeStore();
  const { cart, subtotal, dates, events, persons } = useCartStore();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const [paid, setPaid] = useState(false);
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
      setPaid(true);
      clearCart();
      setLoading(false);
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
  
  if (paid) {
    return (
      <div className="py-5 text-center">
        <h1>Paiement réussi !</h1>
        <p>Merci pour votre achat. Votre planning est confirmé.</p>
        <hr />
        <p>Vous pouvez consulter votre planning dans votre dashboard.</p>
        <Link className="btn btn-secondary me-3" to={'/'+lang+'/client/filter'}>Retour</Link>
        <Link className="btn btn-primary" to={'/'+lang+'/client/orders'}>Aller au dashboard</Link>
      </div>
    );
  }

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