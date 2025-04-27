import React from "react";
import { useThemeStore } from "../stores/themeStore";

const HistoryView: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h2 className="card-title">History</h2>
        <p className="card-text">You have not made any orders yet.</p>
      </div>
    </div>
  );
};

export default HistoryView;
