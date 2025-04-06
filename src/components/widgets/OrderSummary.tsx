import { useState } from "react";
import { useThemeStore } from "../../stores/themeStore";
import { useNavigate } from "react-router-dom";
import { useLangStore } from "../../stores/langStore";

// Reusable OrderSummary component
const OrderSummary: React.FC<{
  subtotal: number;
  shipping: number;
  tax: number;
  onApplyPromo: (code: string) => void;
}> = ({ subtotal, shipping, tax, onApplyPromo }) => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const total = subtotal + shipping + tax;

  const checkout = () => {
    navigate(`/${lang}/pricing`);
  }
  return (
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
            onClick={() => onApplyPromo(promoCode)}
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
          onClick={checkout}
        >
          Proceed to Checkout</button>
      </div>
    </div>
  );
};
export default OrderSummary;