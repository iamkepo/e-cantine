import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from "react-router-dom";

import OrderSummary from '../components/widgets/OrderSummary';

import { days, listStep } from '../helpers/constants';
import { handleSetting, useSettingStore } from '../stores/settingStore';
import { setSubtotal, useCartStore } from '../stores/cartStore';
import { useLangStore } from '../stores/langStore';
import Accordion from '../components/widgets/Accordion';
import { generateDates } from '../helpers/functions';
import DatePicker, { DateObject } from 'react-multi-date-picker';

const ConfigLayout: React.FC = () => {  
  const navigate = useNavigate();
  const { formule } = useParams();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedDays, setCheckedDays] = useState<string[]>(['Mon']);
  const [dates, setDates] = useState<DateObject[]>([])

  const { counter } = useSettingStore();
  const { subtotal } = useCartStore();
  const { lang } = useLangStore();

  const shipping = 10.0;
  const tax = 20.0;

  const toggleDay = (day: string) => {
    const updatedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updatedDays);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep > 0 ? currentStep - 1 : currentStep)
  };
  const handleNext = () => {
    setCurrentStep(currentStep < listStep.length ? currentStep + 1 : currentStep)
  };
  const toggleFormule = () => {
    navigate(`/${lang}/cart/pricing/${formule == 'event' ? "month" : "event"}`)
  }

  useEffect(() => {
  }, [currentStep, formule, subtotal, navigate]);

  const openDatePicker = () => {
    document.getElementById('datePickerRef')?.focus();
  };
  
  return (
    <div className="col-12 p-3">
      {
        window.location.pathname == '/fr/cart' ? 
        false
        :
        <div className="steps-horizontal mx-auto">
          {listStep.map((item) => (
            <div
              key={item.id}
              className={`step-horizontal ${currentStep >= item.id ? 'active' : ''}`} // Pass list to updateSteps
            >
              <div className="step-icon">
                <i className={`bi bi-${item.icon}`}></i>
              </div>
              <div className="step-description">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      }

      <div className={`col col-lg-${window.location.pathname == '/fr/cart' ? '11' : '9'} h-100 mx-auto`}>
        <div className="row mt-5">
          {
            window.location.pathname == '/fr/cart' ? 
            <div className="col-12 d-flex">
              <button
                type="button"
                className="btn btn-outline-primary mb-4 me-5"
                onClick={() => window.history.back()}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <h3>Your Shopping Cart</h3>
            </div>
            :
            false
          }
          <div className={`col col-lg-${window.location.pathname == '/fr/cart' ? '8' : '6'}`}>
            <Outlet />
          </div>
         

          <div className={`col col-lg-${window.location.pathname == '/fr/cart' ? '4' : '6'}`}>
          { window.location.pathname == '/fr/cart' ?
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              onApplyPromo={(code) => {
                if (code === "DISCOUNT10") {
                  setSubtotal();
                }
              }}
            />
            :
            <div className="col-12 border border-3 border-primary rounded-3 p-3">
              <div className="form-check form-switch">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="flexSwitchCheckDefault" 
                  onChange={toggleFormule}
                  checked={formule == 'event'}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                  {formule ? "Event Formule" : "Month Formule"}
                </label>
              </div>
              <Accordion 
                title={`${generateDates(checkedDays).length} date${generateDates(checkedDays).length > 1 ? "s" : ""}`} 
                content={generateDates(checkedDays)} 
              />

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
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-primary" onClick={handlePrev}>
                  Prev
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigLayout;