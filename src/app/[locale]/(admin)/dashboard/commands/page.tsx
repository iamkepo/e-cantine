"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";

const Page: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des commandes</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(<div>creer une commande</div>)}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer une commande</span>
        </button>
      </div>
      <hr />
      <div className="table-responsive">
        <table className={`table table-sm table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Plats</th>
              <th scope="col text-center">Statut</th>
              <th scope="col text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Mark</td>
              <td className="text-center">Mark</td>
              <td className="text-end">
                <i className="bi bi-pencil text-primary me-2"></i>
                <i className="bi bi-trash text-danger"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;