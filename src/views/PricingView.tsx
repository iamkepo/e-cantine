import React, { useState } from "react";
import EventFormule from "../components/EventFormule";
import MonthFormule from "../components/MonthFormule";
import { handleSetting, useSettingStore } from "../stores/settingStore";
import { handlePrev, handleNext } from "../stores/filterStore"; // Import store
import { listStep } from "../helpers/constants";

const PricingView: React.FC = () => {
  const { budget, counter, type } = useSettingStore();
  const [isEventFormule, setIsEventFormule] = useState(true);

  return (
    <div className="col-lg-8 col-12 h-100 mx-auto">
      <div className="row mt-5">
        <div className="col-lg-7 col-12">
          {
            isEventFormule ? 
            <EventFormule budget={budget} counter={counter} type={type} />
            :
            <MonthFormule budget={budget} counter={counter} type={type} />
          }
        </div>
        <div className="col col-lg-5">
          <div className="card">
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault" 
                onChange={() => setIsEventFormule(!isEventFormule)}
                checked={isEventFormule}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                {isEventFormule ? "Event Formule" : "Month Formule"}
              </label>
            </div>
            <p className="text-center">
              Pour 
              <i 
                role="button"
                className="bi bi-dash-circle-fill mx-3" 
                onClick={() => handleSetting('counter', counter - 1)}
                style={{ cursor: 'pointer' }}
              ></i>
              {counter}
              <i 
                role="button"
                className="bi bi-plus-circle-fill mx-3" 
                onClick={() => handleSetting('counter', counter + 1)}
                style={{ cursor: 'pointer' }}
              ></i>
              person{counter > 1 ? "s" : ""}
            </p>
            <div className="d-flex">
              <button className="btn" onClick={handlePrev}>
                Previous
              </button>
              <button className="btn" onClick={() => {
                console.log("Calling handleNext");
                handleNext(listStep.length); // Ensure listStep is passed correctly
              }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingView;