"use client";
import { modal } from "@/stores/appStore";
import { useEffect, useMemo, useState } from "react";
import { IType } from "@/core/interfaces";
import { Meta, IField } from "@/core/types";
import TypeRepository from "@/repositories/typeRepository";
import SubmitComponent from "@/components/SubmitComponent";
import { StatusActivation } from "@/enums";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";
import { useCheckList } from "@/hooks/useCheckList";
import TableComponent from "@/components/TableComponent";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";
import useDataFetch from "@/hooks/useDataForm";

const Page: React.FC = () => {
  const statusOptions = Object.values(StatusActivation);
  const types = useDataFetch<IType>(); 
  const typeRepository = useMemo(() => new TypeRepository(types.handleData), [types.handleData]);
  const [params, setParams] = useState(typeRepository.filterType);
  const { checkList, checkAllList, handleCheckList } = useCheckList((types.state.get?.data as {data: IType[], meta: Meta})?.data.map(type => type.id as number));

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
              {
                checkList.length > 0 ? 
                <BtnConfirmComponent 
                  btn={{ label: `Supprimer (${checkList.length})`, color: "danger", icon: "trash" }}
                  confirm={typeRepository.confirmDeleteTypes}
                  onConfirm={() => typeRepository.deleteTypes(checkList)
                    .then(() => typeRepository.fetchTypes(params))
                    .then(() => checkAllList())
                    .catch((error) => console.error(error))
                    .finally(() => modal.close())
                  }
                />
               :
                <BtnSubmitComponent 
                  btn={{ label: "Creer", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer un type",
                    btn:"Creer",
                    fields:typeRepository.formCreateType() as unknown as IField[],
                    schema:typeRepository.typeSchema
                  }}
                  onSubmit={ (data: IType) => typeRepository.createType(data)
                    .then(() => typeRepository.fetchTypes(params))
                    .catch((error) => console.error(error))
                    .finally(() => modal.close())
                  }
                />
              }
            </div>
          </div>
        </div>

      </div>

      <hr />

      <div className="table-responsive">

        <TableComponent
          checkbox={{checkList, checkAllList, handleCheckList: (e: number) => handleCheckList(e)}}
          thead={typeRepository.tableHeadType}
          list={(types.state.get?.data as {data: IType[], meta: Meta})?.data}
          orderBy={{orderBy: params.orderBy, order: params.order, onChange: (orderBy: string, order: string) => setParams({...params, orderBy, order})}}
          edit={(e: IType) => modal.open(
            <SubmitComponent 
              title={"Modifier le type"} 
              fields={typeRepository.formUpdateType(e) as unknown as IField[]} 
              schema={typeRepository.typeSchema} 
              btn="Modifier" 
              onSubmit={(data) => typeRepository.updateType(e.id as number, data)
                .then(() => typeRepository.fetchTypes(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          trash={(id: number) => modal.open(
            <ConfirmComponent 
              title={typeRepository.confirmDeleteType.title}
              description={typeRepository.confirmDeleteType.description}
              onConfirm={() => typeRepository.deleteType(id)
                .then(() => typeRepository.fetchTypes(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          options={statusOptions.map(status => ({
            label: status,
            action: (id: number) => modal.open(
              <ConfirmComponent 
                title={typeRepository.confirmChangeStatusType.title}
                description={typeRepository.confirmChangeStatusType.description}
                onConfirm={ () => typeRepository.changeStatusType(id, status)
                  .then(() => typeRepository.fetchTypes(params))
                  .catch((error) => console.error(error))
                  .finally(() => modal.close())
                }
              />
            )}
          ))}
        />

        <PaginationComponent 
          page={params.page}
          total={(types.state.get?.data as {data: IType[], meta: Meta})?.meta.pageCount}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;