import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { useHistoryStore } from "../stores/historyStore";
import { articlesPrincipal } from "../core/constants";
import { statusColorRender, statusRender } from "../helpers/functions";

const HistoryView: React.FC = () => {
  const { theme } = useThemeStore();
  const { history } = useHistoryStore();
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title">Historique</h4>

        {history ? (
          <ul className="list-group mb-3">
            {history.map((event, idx) => (
              <li key={idx} className={`list-group-item text-bg-${theme}`}>
                <span>{event.date} {event.slot} {articlesPrincipal.find(a => a.id === event.plat_id)?.label}</span>
                <span className={`ms-2 text-bg-${statusColorRender(event.status)}`}>{statusRender(event.status)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="card-text">Vous n'avez pas fait de commandes.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
