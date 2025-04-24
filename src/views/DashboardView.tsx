import React from 'react';
import { useAuthStore } from '../stores/useAuthStore';

const DashboardView: React.FC = () => {
  const {user} = useAuthStore();

  return (
    <div className="col-10 mx-auto py-5">
      <h1>Mon Dashboard</h1>

      <section className="mb-3">
        <h2>Mon abonnement</h2>
        <div>Pas d'abonnement en cours.</div>
      </section>

      <section className="mb-3">
        <h2>Profil</h2>
        {user ? (
          <div>
            <div>Email : {user.email}</div>
            {/* Ajoute ici d'autres infos ou préférences */}
          </div>
        ) : (
          <div>Non connecté.</div>
        )}
      </section>

      <section className="mb-3">
        <h2>Planning actuel</h2>
        <div>Pas de planning actuel.</div>
      </section>

      {history && history.length > 0 && (
        <section className="mb-3">
          <h2>Historique des plannings</h2>
          <div>Pas d'historique.</div>
        </section>
      )}
    </div>
  );
};

export default DashboardView;
