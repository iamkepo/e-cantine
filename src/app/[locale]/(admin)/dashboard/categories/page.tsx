"use client";
import { modal } from "@/stores/appStore";
import { ICategory } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { StatusActivation } from "@/enums";
import SubmitComponent from "@/components/SubmitComponent";
import CategoryRepository from "@/repositories/categoryRepository";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";
import TableComponent from "@/components/TableComponent";
import { useCheckList } from "@/hooks/useCheckList";
import { Meta, IField } from "@/core/types";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";
import { meta } from "@/core/constants";


const Page: React.FC = () => {
  const [categories, setCategories] = useState<{ data: ICategory[], meta: Meta }>({ data: [], meta});
  const statusOptions = Object.values(StatusActivation);
  const categoryRepository = useMemo(() => new CategoryRepository(setCategories), []);
  const [params, setParams] = useState(categoryRepository.filterCategory);
  const { checkList, checkAllList, handleCheckList } = useCheckList(categories.data.map(category => category.id as number));

  useEffect(() => {
    categoryRepository.fetchCategories(params);
  }, [categoryRepository, params]);


  return (
    <div className="col-12">

      <div className="row">
        <div className="col-12 col-md-3">
          <h4 className="card-title text-break">Liste des categories</h4>
        </div>
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-12 col-md-8">
              <FilterComponent 
                fields={categoryRepository.formFilterCategory() as unknown as IField[]}
                schema={categoryRepository.categoryFilterSchema}
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
                  confirm={categoryRepository.confirmDeleteCategories}
                  onConfirm={() => categoryRepository.deleteCategories(checkList)
                    .then(() => categoryRepository.fetchCategories(params))
                    .then(() => checkAllList())
                    .catch((error) => console.error(error))
                    .finally(() => modal.close())
                  }
                />
               :
                <BtnSubmitComponent 
                  btn={{ label: "Creer", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer une categorie",
                    btn:"Creer",
                    fields:categoryRepository.formCreateCategory() as unknown as IField[],
                    schema:categoryRepository.categorySchema
                  }}
                  onSubmit={ (data: ICategory) => categoryRepository.createCategory(data)
                    .then(() => categoryRepository.fetchCategories(params))
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
          thead={categoryRepository.tableHeadCategory}
          list={categories.data}
          orderBy={{orderBy: params.orderBy, order: params.order, onChange: (orderBy: string, order: string) => setParams({...params, orderBy, order})}}
          edit={(e: ICategory) => modal.open(
            <SubmitComponent 
              title={"Modifier la categorie"} 
              fields={categoryRepository.formUpdateCategory(e) as unknown as IField[]} 
              schema={categoryRepository.categorySchema} 
              btn="Modifier" 
              onSubmit={(data) => categoryRepository.updateCategory(e.id as number, data)
                .then(() => categoryRepository.fetchCategories(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          trash={(id: number) => modal.open(
            <ConfirmComponent 
              title={categoryRepository.confirmDeleteCategory.title}
              description={categoryRepository.confirmDeleteCategory.description}
              onConfirm={() => categoryRepository.deleteCategory(id)
                .then(() => categoryRepository.fetchCategories(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          options={statusOptions.map(status => ({
            label: status,
            action: (id: number) => modal.open(
              <ConfirmComponent 
                title={categoryRepository.confirmChangeStatusCategory.title}
                description={categoryRepository.confirmChangeStatusCategory.description}
                onConfirm={ () => categoryRepository.changeStatusCategory(id, status)
                  .then(() => categoryRepository.fetchCategories(params))
                  .catch((error) => console.error(error))
                  .finally(() => modal.close())
                }
              />
            )}
          ))}
        />
        
        <PaginationComponent
          page={params.page}
          total={categories.meta.pageCount}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;