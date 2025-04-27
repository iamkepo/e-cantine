import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { useHistoryStore } from "../stores/historyStore";

const PlanView: React.FC = () => {
  const { theme } = useThemeStore();
  const { history } = useHistoryStore();
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title">Plan</h4>
        {history ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {history.map(item => (
              <div key={item.id} className="col">
                <div className={`card text-bg-${theme} mb-3`}>
                  <div className="card-body">
                    <h5 className="card-title">{item.address}</h5>
                    <p className="card-text">{item.events?.length} événements</p>
                    <p className="card-text">{item.paymentMethod}</p>
                    <p className="card-text">{item.promoCode}</p>
                    <p className="card-text">{item.tax}</p>
                    <p className="card-text">{item.shipping}</p>
                    <p className="card-text">{item.subtotal}</p>
                    <p className="card-text">{item.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="card-text">Vous n'avez pas créé de plan.</p>
        )}
      </div>
    </div>
  );
};

export default PlanView;
