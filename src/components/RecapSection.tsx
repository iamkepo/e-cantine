import React from "react";
import Accordion from './widgets/Accordion';
import { categoryRender, formatDate } from "../helpers/functions";
import { Cart, PlanningEvent } from "../core/types";

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
  total: number;
  addPerson: () => void;
  removePerson: (email: string) => void;
};

const RecapSection: React.FC<RecapSectionProps> = ({ cart, persons, events, user, theme, subtotal, dates, shipping, tax, total, addPerson, removePerson }) => (
  <div className={`card p-3 text-bg-${theme}`}>
    <h3 className="mb-3">Récapitulatif</h3>
    <Accordion
      title={"Nombre de jours" + ` (${dates?.length || 0})`}
      content={
        <p>{dates?.map(d => formatDate(d.toString())).join(', ')}</p>
      }
    />
    <Accordion
      title={"Nombre de livrasons" + ` (${events?.length || 0})`}
      content={
        <p>{events?.map(e => e.title).join(', ')}</p>
      }
    />
    <Accordion 
      title={"Plats sélectionnés" + ` (${cart.length || 0})`}
      content={
        <ul className="list-group mb-3">
          {cart.map((item, idx) => (
            <li key={idx} className={`list-group-item d-flex justify-content-between align-items-center text-bg-${theme}`}>
              <span className="text-truncate text-wrap">{categoryRender(item.category || 0)} : {item.label}</span>
              <span>{item.count} x {item.price} XOF = {item.count * (item.price || 0)} XOF</span>
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
      <span>Subtotal</span>
      <span>{(subtotal + (persons?.length || 0) * shipping).toFixed(2)} XOF</span>
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
    <div className="d-flex justify-content-between mb-4">
      <strong>Total</strong>
      <strong>{total.toFixed(2)} XOF</strong>
    </div>
  </div>
);

export default RecapSection;
