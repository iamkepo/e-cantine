"use client";
import React, { useState } from "react";
import Accordion from "./Accordion";

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
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const [checkedDays, setCheckedDays] = useState<string[]>(['Mon']);
  const [checkedItems, setCheckedItems] = useState<string[]>(["month-2"]);

  // Toggle a day and update the list of dates
  const toggleDay = (day: string) => {
    const updatedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updatedDays);
  };

  // Generate a list of dates based on selected days
  const generateDates = (selectedDays: string[]) => {
    const dateList: string[] = [];
    const currentDate = new Date();

    // Loop through days until 30 dates are added
    while (selectedDays.length > 0 && dateList.length < 30) {
      const dayName = days[currentDate.getDay()];
      if (selectedDays.includes(dayName)) {
        dateList.push(formatDate(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
  };

  // Format a date into DD/MM/YYYY
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    });
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

      <button type="button" className="btn btn-light py-3">
        Total Budget: {calculateTotalBudget() * generateDates(checkedDays).length * counter} XOF
      </button>
    </div>
  );
};

export default MonthFormule;