"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { IType } from "@/core/interfaces";
import { statusColorRender, statusRender } from "@/helpers/functions";
import { useMemo } from "react";
import TypeRepository from "@/repositories/typeRepository";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { Dropdown } from "@/components/widgets/Dropdown";
import { statusOptionsActivation } from "@/enums";
import ConfirmComponent from "@/components/ConfirmComponent";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [types, setTypes] = useState<IType[]>([]);
  const typeRepository = useMemo(() => new TypeRepository(setTypes), []);
  const statusOptions = Object.values(statusOptionsActivation);

  useEffect(() => {
    typeRepository.fetchTypes();
  }, [typeRepository]);



  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des types</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(
            <SubmitComponent
              title="Creer un type"
              fields={typeRepository.formCreateType() as unknown as IField[]}
              schema={typeRepository.typeSchema}
              btn="Creer"
              onSubmit={(data: IType) => typeRepository.createType(data)
                .then(() => typeRepository.fetchTypes())
                .catch((e) => console.log(e))
                .finally(() => modal.close())
              }
            />
          )}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer un type</span>
        </button>
      </div>
      <hr />
      <div className="table-responsive">
        <table className={`table table-sm table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col" className="text-center">Status</th>
              <th scope="col" className="text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              types.map((type: IType) => (
                <tr key={type.id} className="align-middle">
                  <th scope="row">{type.id}</th>
                  <td>{type.name}</td>
                  <td className="text-center">
                    <button type="button" className={`btn btn-${statusColorRender(type.status)} btn-sm`}>
                      <span className="me-2">{statusRender(type.status)}</span>
                      <Dropdown
                        chevron
                        options={statusOptions.map((status) => ({
                          label: statusRender(status),
                          action: () => modal.open(
                            <ConfirmComponent
                              title={typeRepository.confirmChangeStatusType.title}
                              description={typeRepository.confirmChangeStatusType.description}
                              onConfirm={() => typeRepository.changeStatusType(type.id as number, status)
                                .then(() => typeRepository.fetchTypes())
                                .catch((e) => console.log(e))
                                .finally(() => modal.close())
                              }
                            />
                          )
                        }))}
                      />
                    </button>
                  </td>
                  <td className="text-end">
                    <i 
                      className="bi bi-pencil text-primary me-2"
                      onClick={() => modal.open(
                        <SubmitComponent
                          title="Modifier le type"
                          fields={typeRepository.formUpdateType(type) as unknown as IField[]}
                          schema={typeRepository.typeSchema}
                          btn="Modifier"
                          onSubmit={(data: IType) => typeRepository.updateType(type.id as number, data)
                            .then(() => typeRepository.fetchTypes())
                            .catch((e) => console.log(e))
                            .finally(() => modal.close())
                          }
                        />
                      )}
                    ></i>
                    <i 
                      className="bi bi-trash text-danger"
                      onClick={() => modal.open(
                        <ConfirmComponent
                          title={typeRepository.confirmDeleteType.title}
                          description={typeRepository.confirmDeleteType.description}
                          onConfirm={() => typeRepository.deleteType(type.id as number)
                            .then(() => typeRepository.fetchTypes())
                            .catch((e) => console.log(e))
                            .finally(() => modal.close())
                          }
                        />
                      )}
                    ></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;