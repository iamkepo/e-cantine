import React from "react";
import { useThemeStore } from "../stores/themeStore";

const HistoryView: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <>
      <h2>History</h2>
      <div className={`card text-bg-${theme} mb-3`}>
        <div className="card-body">
          <h2 className="card-title">No history yet.</h2>
        </div>
      </div>
    </>
  );
};

export default HistoryView;
