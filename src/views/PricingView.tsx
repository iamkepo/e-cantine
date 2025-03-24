import React from "react";
import EventFormule from "../components/EventFormule";
import MonthFormule from "../components/MonthFormule";
import { handleSetting, useSettingStore } from "../stores/settingStore";

const PricingView: React.FC = () => {
  const { budget, counter, type } = useSettingStore();

  return (
    <div className="col-lg-8 col-12 h-100 mx-auto">
      <div className="text-center">
        <h1>
          Simple, transparent pricing
          <button
            type="button"
            className={`btn ${budget === 'vip' ? 'btn-primary' : 'btn-outline-primary'} ms-3`}
            onClick={() => handleSetting('budget', budget === 'vip' ? 'normal' : 'vip')}
            aria-label={`Switch to ${budget === 'vip' ? 'normal' : 'vip'} budget`}
          >
            {budget} {budget === 'vip' && <i className="bi bi-patch-check-fill"></i>}
          </button>
        </h1>
        <p className="fs-4">
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
      </div>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <button className={`nav-link text-bg-${type == 'classic' ? 'primary' : 'secondary'}`} type="button" onClick={()=> handleSetting('type', 'classic')}>Classic</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link text-bg-${type == 'vegetalien' ? 'primary' : 'secondary'}`} type="button" onClick={()=> handleSetting('type', 'vegetalien')}>Végétalien</button>
        </li>
      </ul>
      <div className="row mt-5">
        {/* Section "Event" */}
        <div className="col-lg-6 col-12">
          <EventFormule budget={budget} counter={counter} type={type} />
        </div>

        {/* Section "Month" */}
        <div className="col-lg-6 col-12">
          <MonthFormule budget={budget} counter={counter} type={type} />
        </div>
      </div>
    </div>
  );
};

export default PricingView;