import React from "react";
import { useThemeStore } from "../stores/themeStore";

const PlanView: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <>
      <h2>My Plan</h2>
      <div className={`card text-bg-${theme} mb-3`}>
        <div className="card-body">
          <h2 className="card-title">No plan available.</h2>
        </div>
      </div>
    </>
  );
};

export default PlanView;
