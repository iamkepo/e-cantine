"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { ICategory, Meta } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { statusColorRender, statusRender } from "@/helpers/functions";
import { statusOptionsActivation } from "@/enums";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { Dropdown } from "@/components/widgets/Dropdown";
import CategoryRepository from "@/repositories/categoryRepository";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";


const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [categories, setCategories] = useState<{data: ICategory[], meta: Meta}>({
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
  const categoryRepository = useMemo(() => new CategoryRepository(setCategories), []);
  const statusOptions = Object.values(statusOptionsActivation);

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
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => modal.open(
                  <SubmitComponent
                    title="Creer une categorie"
                    fields={categoryRepository.formCreateCategory() as  unknown as IField[]}
                    schema={categoryRepository.categorySchema}
                    btn="Creer"
                    onSubmit={ (data: ICategory) => categoryRepository.createCategory(data)
                      .then(() => categoryRepository.fetchCategories(params))
                      .catch((error) => console.error(error))
                      .finally(() => modal.close())
                    }
                  />
                )}
              >
                <i className="bi bi-plus"></i> 
                <span className="d-none d-md-inline-block ms-2 fw-bold">Creer une categorie</span>
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
              <th scope="col" className="col-md-2 text-center">Status</th>
              <th scope="col" className="col-md-2 text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              categories.data.map((category: ICategory) => (
                <tr key={category.id} className="align-middle">
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td className="text-center">
                    <button type="button" className={`btn btn-${statusColorRender(category.status)} btn-sm`}>
                      <span className="me-2">{statusRender(category.status)}</span>
                      <Dropdown
                        chevron
                        options={statusOptions.map((status) => (
                          {
                            label: statusRender(status),
                            action: () => modal.open(
                              <ConfirmComponent
                                title={categoryRepository.confirmChangeStatusCategory.title}
                                description={categoryRepository.confirmChangeStatusCategory.description}
                                onConfirm={ () => categoryRepository.changeStatusCategory(category.id as number, status)
                                  .then(() => categoryRepository.fetchCategories(params))
                                  .catch((error) => console.error(error))
                                  .finally(() => modal.close())
                                }
                              />
                            )
                          }
                        ))}
                      />
                    </button>
                  </td>
                  <td className="text-end">
                    <i 
                      className="bi bi-pencil text-primary me-2"
                      onClick={() => modal.open(
                        <SubmitComponent
                          title="Modifier la categorie"
                          fields={categoryRepository.formUpdateCategory(category) as unknown as IField[]}
                          schema={categoryRepository.categorySchema}
                          btn="Modifier"
                          onSubmit={ (data: ICategory) => categoryRepository.updateCategory(category.id as number, data)
                            .then(() => categoryRepository.fetchCategories(params))
                            .catch((error) => console.error(error))
                            .finally(() => modal.close())
                          }
                        />
                      )}
                    ></i>
                    <i 
                      className="bi bi-trash text-danger"
                      onClick={() => modal.open(
                        <ConfirmComponent
                          title={categoryRepository.confirmDeleteCategory.title}
                          description={categoryRepository.confirmDeleteCategory.description}
                          onConfirm={ () => categoryRepository.deleteCategory(category.id as number)
                            .then(() => categoryRepository.fetchCategories(params))
                            .catch((error) => console.error(error))
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
          total={categories.meta.pageCount}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;