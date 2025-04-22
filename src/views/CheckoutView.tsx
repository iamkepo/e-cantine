import { useEffect, useState } from "react";
import { setSubtotal, useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";


const CheckoutView = () => {
  const { theme } = useThemeStore();
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const { cart, subtotal } = useCartStore();
  const shipping = 10.0;
  const tax = 20.0;
  const total = subtotal + shipping + tax;
  const methods = [
    { id: 'mtn', label: 'MTN Mobile Money' },
    { id: 'orange', label: 'Orange Money' },
    { id: 'flooz', label: 'Moov Flooz' },
    { id: 'card', label: 'Carte de crédit' }
  ];
  const [form, setForm] = useState({
    paymentMethod: '',
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
    <div className="col-10 mx-auto mt-4">
      <div className="d-flex mt-4">
        <button
          type="button"
          className="btn btn-primary mb-4 me-3"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <h3>Paiement</h3>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className={`card p-3 text-bg-${theme}`}>
          <h3 className="">Séléctionnez la méthode de paiement</h3>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              { 
                methods.map(method => (
                  <div key={method.id} className="col">
                    <label 
                      className={`
                        form-check px-3 py-4 border border-1 
                        text-bg-${form.paymentMethod === method.id ? 'primary' : 'transparent'}
                      `}
                    >
                      <input
                        className="form-check-input d-none"
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
                )) 
              }
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className={`card text-bg-${theme} sticky-lg-top`}>
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} XOF</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)} XOF</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span>{tax.toFixed(2)} XOF</span>
              </div>
              <hr />
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    if (promoCode === "DISCOUNT10") {
                      setPaid(true);
                    }
                  }}
                >
                  Apply
                </button>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>{total.toFixed(2)} XOF</strong>
              </div>
              <button 
                className="btn btn-primary w-100"
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
  );
};

export default CheckoutView;
