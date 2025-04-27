import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { useHistoryStore } from "../stores/historyStore";

const HistoryView: React.FC = () => {
  const { theme } = useThemeStore();
  const { history } = useHistoryStore();
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title">Historique</h4>

        {history ? (
          history.map(item => (
            <ul key={item.id} className="list-group mb-3">
              {item.events?.map((event, idx) => (
                <li key={idx} className={`list-group-item text-bg-${theme}`}>
                  <span>{event.date}</span>
                  <span className="ms-2">{event.title}</span>
                </li>
              ))}
            </ul>
          ))
        ) : (
          <p className="card-text">Vous n'avez pas fait de commandes.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
