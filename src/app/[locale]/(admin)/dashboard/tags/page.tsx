"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";

const Page: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div className="col-12">
      <h4 className="card-title d-flex justify-content-between">Liste des tags
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(<div>creer un tag</div>)}
        >
          <i className="bi bi-plus"></i> Creer un tag
        </button>
      </h4>
      <hr />
      <div className="table-responsive">
        <table className={`table table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col text-end">Actions</th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Mark</td>
              <td className="text-end">
                <button type="button" className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-pencil"></i>
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;