import React from "react";

type PaymentSectionProps = {
  persons: string[];
  form: { paymentMethod: string; promoCode: string; address: string; persons: string[] };
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => void;
  methods: { id: string; label: string }[];
  theme: string;
  loading: boolean;
  handlePay: (e: React.FormEvent) => void;
  addPerson: () => void;
};

const PaymentSection: React.FC<PaymentSectionProps> = ({ persons, form, handleChange, methods, theme, loading, handlePay, addPerson }) => (
  <div className={`card text-bg-${theme} sticky-lg-top`}>
    <form onSubmit={handlePay} className="card-body">
      <h5 className="card-title">Paiement</h5>
      <h6 className="card-title">Adresse de livraison</h6>
      <div className="input-group mb-3">
        <input
          type="text"
          name="address"
          className="form-control"
          placeholder="Enter address"
          value={form.address}
          onChange={e => handleChange(e)}
        />
      </div>

      <h6 className="card-title">Nombre de personnes ({persons?.length || 0})</h6>
      <button type="button" className="btn btn-primary mb-3" onClick={addPerson}>Inviter un ami(e)</button>
      <h6 className="card-title">Code promo</h6>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter promo code"
          value={form.promoCode}
          onChange={e => handleChange(e)}
        />
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            if (form.promoCode === "DISCOUNT10") {
              handleChange({ target: { name: 'promoCode', value: '' } });
            }
          }}
        >
          Apply
        </button>
      </div>
      <h6 className="card-title">Séléctionnez la méthode de paiement</h6>
      <div className="list-group mb-3">
        { methods.map((method) => (
          <div key={method.id} className={`list-group-item text-bg-${theme}`}>
            <label className={`form-check`}>
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={form.paymentMethod === method.id}
                onChange={e => handleChange({ target: { name: 'paymentMethod', value: e.target.value } })}
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
          type="submit"
        >
          Proceed to Checkout
        </button>
      </div>
    </form>
  </div>
);

export default PaymentSection;
