import React from "react";
import EventFormule from "../components/EventFormule";
import MonthFormule from "../components/MonthFormule";
import { useSettingStore } from "../stores/settingStore";

const PricingView: React.FC = () => {
  const { budget, counter, type } = useSettingStore();

  return (
    <div className="col-lg-8 col-12 h-100 mx-auto">
      <div className="row mt-5">
        <div className="col-lg-6 col-12">
          <EventFormule budget={budget} counter={counter} type={type} />
        </div>
        <div className="col-lg-6 col-12">
          <MonthFormule budget={budget} counter={counter} type={type} />
        </div>
      </div>
    </div>
  );
};

export default PricingView;