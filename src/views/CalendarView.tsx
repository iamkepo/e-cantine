import React, { useEffect, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useThemeStore } from "../stores/themeStore";
import { days } from "../helpers/constants";
import { generateDates } from "../helpers/functions";
import { useNavigate } from "react-router-dom";
import { useLangStore } from "../stores/langStore";

const CalendarView: React.FC = () => {
  const { theme } = useThemeStore();
  const [dates, setDates] = useState<DateObject[]>();
  const [checkedDays, setCheckedDays] = useState<string[]>(days);
  const navigate = useNavigate();
  const { lang } = useLangStore();

  const checkout = () => {
    navigate(`/${lang}/pricing/1`);
  }
  // Toggle a day and update the list of dates
  const toggleDay = (day: string) => {
    const updatedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updatedDays);
  };

  useEffect(() => {
    setDates(generateDates(checkedDays,30))
  }, [checkedDays]);
  
  
  return (
    <div className="col-lg-9 col-12 mt-5 mx-auto">
      <div className="row">
        <div className="col">
          <Calendar
            className={`card mb-3 text-bg-${theme}`}
            value={dates}
            numberOfMonths={2}
            showOtherDays
            multiple
            onChange={(selectedDates) => setDates(selectedDates.map(date => date))}
          >
          </Calendar>
        </div>
        <div className="col-5 d-flex">
          <div className={`card p-3 flex-colunm flex-shrink-1 justify-content-between text-bg-${theme}`}>
            <div className="d-flex justify-content-between">
              {days.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  className={`btn btn-sm ${checkedDays.includes(day) ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
            <button 
              className="btn btn-primary"
              onClick={checkout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;