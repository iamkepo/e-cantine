"use client";
import { useThemeStore } from "@/stores/themeStore";


const Page: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <div className="col-12">
      <h3 className="mb-3">Dashboard</h3>
      <div className={`card text-bg-${theme} mb-3`}>
        <div className="card-body">
          <h5 className="card-title">Statistiques</h5>
          <div className="row">
            <div className="col-12 col-md-3">
              <div className={`card text-bg-${theme}`}>
                <div className="card-body">
                  <h6 className="card-title">Nombre de plats</h6>
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className={`card text-bg-${theme}`}>
                <div className="card-body">
                  <h6 className="card-title">Nombre de tags</h6>
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className={`card text-bg-${theme}`}>
                <div className="card-body">
                  <h6 className="card-title">Nombre de commandes</h6>
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className={`card text-bg-${theme}`}>
                <div className="card-body">
                  <h6 className="card-title">Nombre de clients</h6>
                  <p className="card-text">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
