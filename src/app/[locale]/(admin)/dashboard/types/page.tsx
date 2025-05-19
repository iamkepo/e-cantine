"use client";

import { modal } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { IType, Meta } from "@/core/interfaces";
import { useMemo } from "react";
import TypeRepository from "@/repositories/typeRepository";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { statusOptionsActivation } from "@/enums";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";
import { useCheckList } from "@/hooks/useCheckList";
import { TableComponent } from "@/components/TableComponent";
import { meta } from "@/core/constants";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";

const Page: React.FC = () => {
  const [types, setTypes] = useState<{ data: IType[], meta: Meta }>({ data: [], meta});
  const statusOptions = Object.values(statusOptionsActivation);
  const typeRepository = useMemo(() => new TypeRepository(setTypes), []);
  const [params, setParams] = useState(typeRepository.filterType);
  const { checkList, checkAllList, handleCheckList } = useCheckList(types.data.map(type => type.id as number));

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
                  btn={{ label: `Supprimer ${checkList.length} tags`, color: "danger", icon: "trash" }}
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
                  btn={{ label: "Creer un tag", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer un tag",
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
          list={types.data}
          setList={(e: IType[]) => setTypes({...types, data: e})}
          // eye={(e: IType) => false}
          edit={(e: IType) => modal.open(
            <SubmitComponent 
              title={"Update type"} 
              fields={typeRepository.formUpdateType(e) as unknown as IField[]} 
              schema={typeRepository.typeSchema} 
              btn="Update" 
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
          total={types.meta.pageCount}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;