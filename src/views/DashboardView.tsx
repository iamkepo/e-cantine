import React from 'react';
import { useAuthStore } from '../stores/useAuthStore';

const DashboardView: React.FC = () => {
  const {user} = useAuthStore();

  return (
    <div className="container py-5">
      <h1>Mon Dashboard</h1>

      <section>
        <h2>Mon abonnement</h2>
        <div>Pas d'abonnement en cours.</div>
      </section>

      <section>
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

      <section>
        <h2>Planning actuel</h2>
       
      </section>

      {history && history.length > 0 && (
        <section>
          <h2>Historique des plannings</h2>
        </section>
      )}
    </div>
  );
};

export default DashboardView;
