"use client";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Accordion from "./Accordion";
import { useAppStore } from "../store/appStore";

interface EventFormuleProps {
  budget: 'normal' | 'vip',
  counter: number,
  type: 'classic' | 'vegetalien'
}
const EventFormule: React.FC<EventFormuleProps> = ({budget, counter, type}) => {  
  const { theme } = useAppStore();
  const tomorrow = new DateObject().add(1, "day")

  const [checkedItems, setCheckedItems] = useState<string[]>(['event-2']);

  const [dates, setDates] = useState<DateObject[]>([tomorrow])

  const title = "Special event day";
  const items = [
    { id: 'event-0', name: "Entrée", classic: { normal: 400, vip: 1000 }, vegetalien: { normal: 500, vip: 1200 } }, 
    { id: 'event-1', name: "Plat principal", classic: { normal: 1500, vip: 2500 }, vegetalien: { normal: 2000, vip: 3000 } }, 
    { id: 'event-2', name: "Dessert", classic: { normal: 300, vip: 1000 }, vegetalien: { normal: 500, vip: 1200 } }, 
    { id: 'event-3', name: "Boisson", classic: { normal: 500, vip: 1000 }, vegetalien: { normal: 500, vip: 1000 } }
  ];

  // Gestion des changements pour chaque case à cocher
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems((prev) => [...prev, id]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  // Calcul du total du budget des items cochés
  const calculateTotalBudget = () => {
    let total = 0;
    if (checkedItems.length > 0) {
      total = checkedItems.reduce((sum, id) => {
        const item = items.find((item) => item.id === id);
        return item ? sum + item[type][budget] : sum;
      }, 0);
    }
    return total
  };
  const [documentValue, setDocumentValue] = useState<Document | null>(null)
  
  useEffect(() => {
    // Access document safely here
    if (document) {
      setDocumentValue(document)
    }
  }, [])

  const openDatePicker = () => {
    if (documentValue) {
      documentValue?.getElementById('datePickerRef')?.focus();
    }
  };
  return (
    <div className={`col-12 formule d-flex flex-column justify-content-between shadow-sm p-4 h-100 rounded-4 text-bg-${theme}`}>
      <div className="mb-3">
        <h2>{title}</h2>
        <Accordion
          title={`${dates.length} date${dates.length > 1 ? "s" : ""}`}
          content={dates}
        />
        <div className="position-relative">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={openDatePicker} // Ouvre le DatePicker
          >
            Select date(s)
          </button>
          <DatePicker 
            id="datePickerRef"
            format="DD/MM/YYYY"
            multiple
            sort
            style={{opacity: '0'}}
            value={dates} 
            onChange={(e)=>setDates(e)} 
          />
        </div>
      </div>
      
      <ul className="list-group mb-3">
        {items.map(item => (
          <li key={item.id} className="list-group-item clearfix">
            <input 
              id={item.id} 
              className="form-check-input me-2" 
              type="checkbox" 
              checked={checkedItems.includes(item.id)}
              onChange={(e) =>
                handleCheckboxChange(item.id, e.target.checked)
              }
              />
            <label htmlFor={item.id} className="form-check-label stretched-link">
              {item.name}
            </label>
            <span className="badge text-bg-danger float-end">{item[type][budget]} XOF</span>
          </li>
        ))}
      </ul>
      <p className="mb-3"> 
        1 Livraison to {dates.length} day{dates.length > 1 ? "s" : ""}
        <span className="badge text-bg-danger ms-3">{( 1000 * dates.length )} XOF</span>
      </p>
      <button type="button" className="btn btn-primary py-3">
        Total Budget: {
        (calculateTotalBudget()*dates.length*counter) 
        +
         ( 1000 * dates.length )
        } XOF
      </button>
    </div>
  );
}
export default EventFormule;