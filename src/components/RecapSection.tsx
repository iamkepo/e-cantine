import React from "react";
import Accordion from './widgets/Accordion';
import { categoryRender } from "../helpers/functions";
import { Cart, PlanningEvent } from "../core/types";
import { articlesBoisson, articlesPrincipal, articlesSupplement } from "../core/constants";
import { priceAccomp, priceBoisson } from "../stores/cartStore";

type RecapSectionProps = {
  cart: Cart[];
  persons: string[];
  events: PlanningEvent[] | undefined;
  user: { email: string } | null;
  theme: string;
  subtotal: number;
  dates: Date[] | undefined;
  shipping: number;
  tax: number;
  addPerson: () => void;
  removePerson: (email: string) => void;
};

const RecapSection: React.FC<RecapSectionProps> = ({ cart, persons, events, user, theme, subtotal, dates, shipping, tax, addPerson, removePerson }) => (
  <div className={`card p-3 text-bg-${theme}`}>
    <h3 className="mb-3">Récapitulatif</h3>

    <div className="d-flex justify-content-between mb-3">
      <span>Nombre de jours</span>
      <span>{dates?.length || 0}</span>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Nombre de livrasons</span>
      <span>{events?.length || 0}</span>
    </div>
    <Accordion 
      title={"Plats sélectionnés" + ` (${cart.length || 0})`}
      content={
        <ul className="list-group mb-3">
          {cart.map((item, idx) => (
            <li key={idx} className={`list-group-item d-flex justify-content-between align-items-center text-bg-${theme}`}>
              <span className="text-truncate text-wrap">
                {categoryRender(articlesPrincipal.find(a => a.id === item.id)?.category || 0)} 
              </span>
              <span>
                {item.count} x {articlesPrincipal.find(a => a.id === item.id)?.price} XOF =
                {item ?
                  (((articlesPrincipal.find(a => a.id === item.id)?.price || 0) 
                  + priceAccomp(articlesSupplement, item as Cart) 
                  + priceBoisson(articlesBoisson, item as Cart)) * item.count).toFixed(2)
                : 0} XOF
              </span>
            </li>
          ))}
        </ul>
      }
    />
    <Accordion 
      title={"Participants" + (persons.length > 0 ? ` (${persons.length})` : '')}
      content={
        <p>
          {persons.map((person, idx) => (
            <button
              key={idx}
              type="button"
              className={`btn btn-sm me-2 mb-2 btn-${user?.email === person ? 'primary' : theme}`}
            >
              {person} { user?.email !== person && <i className="bi bi-trash ms-2 text-danger" onClick={() => removePerson(person)}></i>}
            </button>
          ))}
          <button 
            type="button"
            className="btn btn-sm btn-primary mb-2" 
            onClick={addPerson}
          >
            <i className="bi bi-plus"></i>
          </button>
        </p>
      }
    />
    <hr />
    <div className="d-flex justify-content-between mb-3">
      <span>Tax</span>
      <span>{tax.toFixed(2)} XOF</span>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Shipping</span>
      <span>{shipping.toFixed(2)} XOF</span>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Subtotal</span>
      <span>{subtotal.toFixed(2)} XOF</span>
    </div>
    <hr />
    <div className="d-flex justify-content-between mb-4">
      <strong>Total</strong>
      <strong>{(subtotal + shipping + tax).toFixed(2)} XOF</strong>
    </div>
  </div>
);

export default RecapSection;
