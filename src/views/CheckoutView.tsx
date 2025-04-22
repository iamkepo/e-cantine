import { useEffect, useState } from "react";
import { decrementPerson, incrementPerson, setSubtotal, useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";
import Counter from "../components/widgets/Counter";


const CheckoutView = () => {
  const { theme } = useThemeStore();
  const { cart, subtotal, dates, events, person } = useCartStore();
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const shipping = 500.0 * (dates?.length || 0);
  const tax = 20.0;
  const total = subtotal + (shipping*person) + tax;
  const methods = [
    { id: 'mtn', label: 'MTN Mobile Money' },
    { id: 'orange', label: 'Orange Money' },
    { id: 'flooz', label: 'Moov Flooz' },
    { id: 'card', label: 'Carte de crédit' },
    { id: 'cash', label: 'Espèces' }
  ];
  const [form, setForm] = useState({
    paymentMethod: '',
    promoCode: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setPaid(true);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    setSubtotal();
  }, [cart]);
  
  if (paid) {
    return (
      <div className="container py-5 text-center">
        <h1>Paiement réussi !</h1>
        <p>Merci pour votre achat. Votre planning est confirmé.</p>
      </div>
    );
  }

  return (
    <div className="col-10 mx-auto">
      <div className="row">
        <div className="col-lg-8">
          <div className={`card p-3 text-bg-${theme}`}>
            <h3 className="mb-3">Récapitulatif</h3>
            <div className="d-flex justify-content-between mb-3">
              <span>Nombre de jours</span>
              <span>{dates?.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Nombre d'events</span>
              <span>{events?.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Nombre de personnes</span>
              <span>{person}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <span>Subtotal</span>
              <span>{(subtotal + (person * shipping)).toFixed(2)} XOF</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Shipping</span>
              <span>{(person * shipping).toFixed(2)} XOF</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Tax</span>
              <span>{tax.toFixed(2)} XOF</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <strong>Total</strong>
              <strong>{total.toFixed(2)} XOF</strong>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className={`card text-bg-${theme} sticky-lg-top`}>
            <div className="card-body">
              <h5 className="card-title">Paiement</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Nombre de personnes</span>
                <Counter
                  value={person}
                  onIncrement={incrementPerson}
                  onDecrement={decrementPerson}
                />
              </div>
              <h6 className="card-title">Code promo</h6>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter promo code"
                  value={form.promoCode}
                  onChange={(e) => setForm(f => ({ ...f, promoCode: e.target.value }))}
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    if (form.promoCode === "DISCOUNT10") {
                      setPaid(true);
                    }
                  }}
                >
                  Apply
                </button>
              </div>
              <h6 className="card-title">Séléctionnez la méthode de paiement</h6>
              <div className="list-group mb-3">
                { methods.map(method => (
                  <div key={method.id} className={`list-group-item text-bg-${theme}`}>
                    <label className={`form-check`}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={handleChange}
                      />
                      <span className="form-check-label">
                        {method.label}
                      </span>
                    </label>
                  </div>  
                )) }
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>Retour</button>
                <button 
                  className="btn btn-primary" 
                  disabled={loading}
                  onClick={handlePay}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
