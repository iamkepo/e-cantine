import React, { useEffect } from "react";
import EventFormule from "../components/EventFormule";
import MonthFormule from "../components/MonthFormule";
import { useSettingStore } from "../stores/settingStore";
import { useParams } from "react-router-dom";

const PricingView: React.FC = () => {
  const { formule } = useParams();
  const { budget, counter, type } = useSettingStore();

  useEffect(() => {
  }, [formule]);

  return (
    formule == 'event' ? 
    <EventFormule budget={budget} counter={counter} type={type} />
    :
    <MonthFormule budget={budget} counter={counter} type={type} />
  );
};

export default PricingView;