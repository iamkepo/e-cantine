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

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [types, setTypes] = useState<IType[]>([]);
  const typeRepository = useMemo(() => new TypeRepository(), []);
  const statusOptions = Object.values(statusOptionsActivation);

  useEffect(() => {
    async function fetchTypes() {
      const data = await typeRepository.fetchTypes();
      if (data) {
        setTypes(data as IType[])
      }
    }
    fetchTypes();
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
              onSubmit={typeRepository.createType}
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
              <th scope="col">Status</th>
              <th scope="col text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              types.map((type: IType) => (
                <tr key={type.id}>
                  <th scope="row">{type.id}</th>
                  <td>{type.name}</td>
                  <td>
                    <span className={`badge text-bg-${statusColorRender(type.status)}`}>{statusRender(type.status)}</span>
                    <Dropdown
                      options={statusOptions.map((status) => (
                        {
                          label: statusRender(status),
                          action: () => modal.open(
                            <SubmitComponent
                              title="Changer le status"
                              fields={typeRepository.formChangeStatusType() as unknown as IField[]}
                              schema={typeRepository.typeSchema}
                              btn="Changer"
                              onSubmit={async () => {
                                setTypes((await typeRepository.changeStatusType(type.id as number, status)) as IType[]);
                                modal.close();
                              }}
                            />
                          )
                        }
                      ))}
                    />
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
                          onSubmit={async (data: IType) => {
                            setTypes((await typeRepository.updateType(type.id as number, data)) as IType[]);
                            modal.close();
                          }}
                        />
                      )}
                    ></i>
                    <i 
                      className="bi bi-trash text-danger"
                      onClick={() => modal.open(
                        <SubmitComponent
                          title="Supprimer le type"
                          fields={typeRepository.formDeleteType() as unknown as IField[]}
                          schema={typeRepository.typeSchema}
                          btn="Supprimer"
                          onSubmit={async () => {
                            setTypes((await typeRepository.deleteType(type.id as number)) as IType[]);
                            modal.close();
                          }}
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