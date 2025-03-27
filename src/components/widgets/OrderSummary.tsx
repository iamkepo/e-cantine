import { useState } from "react";

// Reusable OrderSummary component
const OrderSummary: React.FC<{
  subtotal: number;
  shipping: number;
  tax: number;
  onApplyPromo: (code: string) => void;
}> = ({ subtotal, shipping, tax, onApplyPromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const total = subtotal + shipping + tax;

  return (
    <div className="card cart-summary">
      <div className="card-body">
        <h5 className="card-title mb-4">Order Summary</h5>
        <div className="d-flex justify-content-between mb-3">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
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
          <strong>${total.toFixed(2)}</strong>
        </div>
        <button className="btn btn-primary w-100">Proceed to Checkout</button>
      </div>
    </div>
  );
};
export default OrderSummary;