"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { IType, Meta } from "@/core/interfaces";
import { statusColorRender, statusRender } from "@/helpers/functions";
import { useMemo } from "react";
import TypeRepository from "@/repositories/typeRepository";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { Dropdown } from "@/components/widgets/Dropdown";
import { statusOptionsActivation } from "@/enums";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [types, setTypes] = useState<{data: IType[], meta: Meta}>({
    data: [],
    meta: {total: 0, page: 1, pageCount: 1, limit: 10}
  });
  const [params, setParams] = useState({
    skip: 0,
    take: 10,
    search: "",
    status: "",
    page: 1,
  });
  const typeRepository = useMemo(() => new TypeRepository(setTypes), []);
  const statusOptions = Object.values(statusOptionsActivation);

  useEffect(() => {
    typeRepository.fetchTypes(params);
  }, [typeRepository, params]);



  return (
    <div className="col-12">

      <div className="row">
        <div className="col-12 col-md-3">
          <h4 className="card-title text-break">Liste des types</h4>
        </div>
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-12 col-md-8">
              <FilterComponent 
                fields={typeRepository.formFilterType() as unknown as IField[]}
                schema={typeRepository.typeFilterSchema}
                onSubmit={(data: {search: string, status: string}) => {
                  setParams({
                    ...params,
                    search: data.search,
                    status: data.status,
                  });
                }}
              />
            </div>
            <div className="col-12 col-md-4 text-end">
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
                      .then(() => typeRepository.fetchTypes(params))
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
          </div>
        </div>

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
              types.data.map((type: IType) => (
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
                                .then(() => typeRepository.fetchTypes(params))
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
                            .then(() => typeRepository.fetchTypes(params))
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
                            .then(() => typeRepository.fetchTypes(params))
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

        <PaginationComponent 
          page={params.page}
          total={types.meta.pageCount}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;