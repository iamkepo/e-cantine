import React from "react";
import { useThemeStore } from "../stores/themeStore";

const PlanView: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h2 className="card-title">My Plan</h2>
        <p className="card-text">You have not created a plan yet.</p>
      </div>
    </div>
  );
};

export default PlanView;
