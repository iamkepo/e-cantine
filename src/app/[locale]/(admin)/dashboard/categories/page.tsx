"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { ICategory } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { statusColorRender, statusRender } from "@/helpers/functions";
import { statusOptionsActivation } from "@/enums";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { Dropdown } from "@/components/widgets/Dropdown";
import CategoryRepository from "@/repositories/categoryRepository";


const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const categoryRepository = useMemo(() => new CategoryRepository(), []);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const statusOptions = Object.values(statusOptionsActivation);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoryRepository.fetchCategories();
      setCategories(data as ICategory[]);
    };
    fetchCategories();
  }, [categoryRepository]);


  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des categories</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(
            <SubmitComponent
              title="Creer une categorie"
              fields={categoryRepository.formCreateCategory() as  unknown as IField[]}
              schema={categoryRepository.categorySchema}
              btn="Creer"
              onSubmit={async (data: ICategory) => {
                setCategories((await categoryRepository.createCategory(data)) as ICategory[]);
                modal.close();
              }}
            />
          )}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer une categorie</span>
        </button>
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
              categories.map((category: ICategory) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td className="text-center">
                    <span className={`badge text-bg-${statusColorRender(category.status)}`}>{statusRender(category.status)}</span>
                    <Dropdown
                      options={statusOptions.map((status) => (
                        {
                          label: statusRender(status),
                          action: () => modal.open(
                            <SubmitComponent
                              title="Changer le status"
                              fields={categoryRepository.formChangeStatusCategory() as unknown as IField[]}
                              schema={categoryRepository.categorySchema}
                              btn="Changer"
                              onSubmit={async () => {
                                setCategories((await categoryRepository.changeStatusCategory(category.id as number, status)) as ICategory[]);
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
                          title="Modifier la categorie"
                          fields={categoryRepository.formUpdateCategory(category) as unknown as IField[]}
                          schema={categoryRepository.categorySchema}
                          btn="Modifier"
                          onSubmit={async (data: ICategory) => {
                            setCategories((await categoryRepository.updateCategory(category.id as number, data)) as ICategory[]);
                            modal.close();
                          }}
                        />
                      )}
                    ></i>
                    <i 
                      className="bi bi-trash text-danger"
                      onClick={() => modal.open(
                        <SubmitComponent
                          title="Supprimer la categorie"
                          fields={categoryRepository.formDeleteCategory() as unknown as IField[]}
                          schema={categoryRepository.categorySchema}
                          btn="Supprimer"
                          onSubmit={async () => {
                            setCategories((await categoryRepository.deleteCategory(category.id as number)) as ICategory[]);
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