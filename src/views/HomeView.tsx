import React, { useState } from "react";
import EventFormule from "../components/EventFormule";
import MonthFormule from "../components/MonthFormule";

const HomeView: React.FC = () => {
  const [setting, setSetting] = useState<{
    budget: 'normal' | 'vip',
    counter: number,
    type: 'classic' | 'vegetalien'
  }>({
    budget: 'normal',
    counter: 2,
    type: 'classic'
  });

  const handleSetting = (field: string, value: unknown) => {
    if (field === 'counter') {
      const newCount = Math.max(1, value as number);
      setSetting({ ...setting, counter: newCount });
    } else {
      setSetting({ ...setting, [field]: value });
    }
  };

  return (
    <div className="col-lg-8 col-12 h-100 mx-auto">
      <div className="text-center">
        <h1>
          Simple, transparent pricing
          <button
            type="button"
            className={`btn ${setting.budget === 'vip' ? 'btn-primary' : 'btn-outline-primary'} ms-3`}
            onClick={() => handleSetting('budget', setting.budget === 'vip' ? 'normal' : 'vip')}
            aria-label={`Switch to ${setting.budget === 'vip' ? 'normal' : 'vip'} budget`}
          >
            {setting.budget} {setting.budget === 'vip' && <i className="bi bi-patch-check-fill"></i>}
          </button>
        </h1>
        <p className="fs-4">
          Pour 
          <i 
            role="button"
            className="bi bi-dash-circle-fill mx-3" 
            onClick={() => handleSetting('counter', setting.counter - 1)}
            style={{ cursor: 'pointer' }}
          ></i>
          {setting.counter}
          <i 
            role="button"
            className="bi bi-plus-circle-fill mx-3" 
            onClick={() => handleSetting('counter', setting.counter + 1)}
            style={{ cursor: 'pointer' }}
          ></i>
          persons
        </p>
      </div>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <button className={`nav-link text-bg-${setting.type == 'classic' ? 'primary' : 'secondary'}`} type="button" onClick={()=> handleSetting('type', 'classic')}>Classic</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link text-bg-${setting.type == 'vegetalien' ? 'primary' : 'secondary'}`} type="button" onClick={()=> handleSetting('type', 'vegetalien')}>Végétalien</button>
        </li>
      </ul>
      <div className="row mt-5">
        {/* Section "Event" */}
        <div className="col-lg-6 col-12">
          <EventFormule budget={setting.budget} counter={setting.counter} type={setting.type} />
        </div>

        {/* Section "Month" */}
        <div className="col-lg-6 col-12">
          <MonthFormule budget={setting.budget} counter={setting.counter} type={setting.type} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;