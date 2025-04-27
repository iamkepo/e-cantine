import React from 'react';
import { useThemeStore } from '../stores/themeStore';

const DashboardView: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <h1>Mes Statistiques</h1>
      <div className={`card text-bg-${theme} mb-3`}>
        <div className="card-body">
          <h2 className="card-title">Nombre d'articles</h2>
          <p className="card-text">0</p>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
