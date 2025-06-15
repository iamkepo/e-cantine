"use client";
import { modal, toast } from "@/stores/appStore";
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
import { Field, MetaResponse } from "@/core/types";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";


const Page: React.FC = () => {
  const statusOptions = Object.values(StatusActivation);
  const [categories, setCategories] = useState<MetaResponse<ICategory>>(); 
  const categoryRepository = useMemo(() => new CategoryRepository(), []);
  const [params, setParams] = useState(categoryRepository.filterCategory);
  const { checkList, checkAllList, handleCheckList } = useCheckList((categories?.data as ICategory[])?.map(category => category.id as number));

  useEffect(() => {
    categoryRepository.fetchCategories(params, setCategories);
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
                fields={categoryRepository.formFilterCategory() as unknown as Field[]}
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
                  onConfirm={() => categoryRepository.deleteCategories(checkList,
                    () => {
                      toast.success("Categories supprimees"); 
                      categoryRepository.fetchCategories(params, setCategories); 
                      checkAllList(); 
                      modal.close()
                    }
                  )}
                />
               :
                <BtnSubmitComponent 
                  btn={{ label: "Creer", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer une categorie",
                    btn:"Creer",
                    fields:categoryRepository.formCreateCategory() as unknown as Field[],
                    schema:categoryRepository.categorySchema
                  }}
                  onSubmit={ (data: ICategory) => categoryRepository.createCategory(data,
                    () => {
                      toast.success("Categorie creee"); 
                      categoryRepository.fetchCategories(params, setCategories); 
                      modal.close()
                    })
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
          list={(categories?.data as ICategory[])}
          orderBy={{orderBy: params.orderBy, sort: params.sort, onChange: (orderBy: string, sort: string) => setParams({...params, orderBy, sort})}}
          edit={(e: ICategory) => modal.open(
            <SubmitComponent 
              title={"Modifier la categorie"} 
              fields={categoryRepository.formUpdateCategory(e) as unknown as Field[]} 
              schema={categoryRepository.categorySchema} 
              btn="Modifier" 
              onSubmit={(data) => categoryRepository.updateCategory(e.id as number, data,
                () => {
                  toast.success("Categorie modifiee"); 
                  categoryRepository.fetchCategories(params, setCategories); 
                  modal.close()
                })
              } 
            />
          )}
          trash={(id: number) => modal.open(
            <ConfirmComponent 
              title={categoryRepository.confirmDeleteCategory.title}
              description={categoryRepository.confirmDeleteCategory.description}
              onConfirm={() => categoryRepository.deleteCategory(id,
                () => {
                  toast.success("Categorie supprimee");
                  categoryRepository.fetchCategories(params, setCategories); 
                  modal.close()
                })
              } 
            />
          )}
          options={statusOptions.map(status => ({
            label: status,
            action: (id: number) => modal.open(
              <ConfirmComponent 
                title={categoryRepository.confirmChangeStatusCategory.title}
                description={categoryRepository.confirmChangeStatusCategory.description}
                onConfirm={ () => categoryRepository.changeStatusCategory(id, status,
                  () => {
                    toast.success("Categorie modifiee"); 
                    categoryRepository.fetchCategories(params, setCategories); 
                    modal.close()
                  })
                }
              />
            )}
          ))}
        />
        
        <PaginationComponent
          page={params.page}
          total={(categories?.meta.pageCount as number)}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;