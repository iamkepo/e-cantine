import React from "react";
import { useThemeStore } from "../stores/themeStore";

const OrdersView: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <>
      <h2>My Orders</h2>
      <div className={`card text-bg-${theme} mb-3`}>
        <div className="card-body">
          <h2 className="card-title">Nombre d'articles</h2>
          <p className="card-text">0</p>
        </div>
      </div>
    </>
  );
};

export default OrdersView;
