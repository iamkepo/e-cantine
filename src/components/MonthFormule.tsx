"use client";
import React, { useState } from "react";
import Accordion from "./widgets/Accordion";
import { generateDates } from "../helpers/functions";
import { days } from "../helpers/constants";

interface MonthFormuleProps {
  budget: "normal" | "vip";
  counter: number;
  type: "classic" | "vegetalien";
}

const MonthFormule: React.FC<MonthFormuleProps> = ({ budget, counter, type }) => {
  const title = "Monthly plan";
  const items = [
    { id: "month-0", name: "Petit-déjeuner", classic: { normal: 300, vip: 1000 }, vegetalien: { normal: 500, vip: 1200 } },
    { id: "month-1", name: "Déjeuner", classic: { normal: 500, vip: 1500 }, vegetalien: { normal: 1000, vip: 2000 } },
    { id: "month-2", name: "Goûter", classic: { normal: 200, vip: 500 }, vegetalien: { normal: 700, vip: 1500 } },
    { id: "month-3", name: "Dîner", classic: { normal: 1000, vip: 2000 }, vegetalien: { normal: 1500, vip: 2500 } },
  ];
  
  const [checkedDays, setCheckedDays] = useState<string[]>(['Mon']);
  const [checkedItems, setCheckedItems] = useState<string[]>(["month-2"]);

  // Toggle a day and update the list of dates
  const toggleDay = (day: string) => {
    const updatedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updatedDays);
  };



  // Handle checkbox changes for items
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems((prev) => [...prev, id]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    }
  };
  // Calculate the total budget
  const calculateTotalBudget = () => {
    return checkedItems.reduce((sum, id) => {
      const item = items.find((item) => item.id === id);
      return item ? sum + item[type][budget] : sum;
    }, 0);
  };

  return (
    <div className="bg-primary text-white d-flex flex-column justify-content-between shadow-sm p-4 h-100 rounded-4">
      <div className="mb-3">
        <h2>{title}</h2>
        <Accordion title={`${generateDates(checkedDays).length} date${generateDates(checkedDays).length > 1 ? "s" : ""}`} content={generateDates(checkedDays)} />

        <div className="d-flex justify-content-between">
          {days.map((day, i) => (
            <button
              key={i}
              type="button"
              className={`btn ${checkedDays.includes(day) ? "btn-light" : "btn-secondary"}`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <ul className="list-group mb-3">
        {items.map((item) => (
          <li key={item.id} className="list-group-item clearfix">
            <input
              id={item.id}
              className="form-check-input me-2"
              type="checkbox"
              checked={checkedItems.includes(item.id)}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
            />
            <label htmlFor={item.id} className="form-check-label stretched-link">
              {item.name}
            </label>
            <span className="badge text-bg-danger float-end">{item[type][budget]} XOF</span>
          </li>
        ))}
      </ul>
      <p className="mb-3"> 
        {checkedItems.length} Livraison{checkedItems.length > 1 ? "s" : ""} to {generateDates(checkedDays).length} day{generateDates(checkedDays).length > 1 ? "s" : ""} 
        <span className="badge text-bg-danger ms-3">{( checkedItems.length * 500 * generateDates(checkedDays).length )} XOF</span>
      </p>
      <button type="button" className="btn btn-light py-3">
        Total Budget: {
        (calculateTotalBudget() * generateDates(checkedDays).length * counter) 
        +
        (checkedItems.length * 500 * generateDates(checkedDays).length)
        } XOF
      </button>
    </div>
  );
};

export default MonthFormule;