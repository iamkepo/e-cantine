"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";

const Page: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div>
      <h3 className="mb-3">Plats</h3>
      <div className={`card text-bg-${theme}`}>
        <div className="card-body">
          <h4 className="card-title d-flex justify-content-between">Liste des plats
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => modal.open(<div>creer un plat</div>)}
            >
              <i className="bi bi-plus"></i> Creer un plat
            </button>
          </h4>
          <hr />

          <table className={`table table-striped table-${theme}`}>
            <thead className="table-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className={`table-${theme}`}>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Mark</td>
                <td>
                  <button type="button" className="btn btn-outline-primary">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button type="button" className="btn btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Page;