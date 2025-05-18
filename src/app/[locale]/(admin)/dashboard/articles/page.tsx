/* eslint-disable @next/next/no-img-element */
"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { IArticle } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { statusColorRender, statusRender } from "@/helpers/functions";
import { Dropdown } from "@/components/widgets/Dropdown";
import { statusOptionsActivation } from "@/enums";
import ArticleRepository from "@/repositories/articleRepository";
import { IField } from "@/components/FormComponent";
import SubmitComponent from "@/components/SubmitComponent";
import ConfirmComponent from "@/components/ConfirmComponent";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [articles, setArticles] = useState<IArticle[]>([]);

  const statusOptions = Object.values(statusOptionsActivation);
  const articleRepository = useMemo(() => new ArticleRepository(setArticles), []);

  useEffect(() => {
    articleRepository.fetchArticles();
  }, [articleRepository]);

 

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des articles</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(
            <SubmitComponent 
              title="Creer un article"
              fields={articleRepository.formCreateArticle() as unknown as IField[]}
              schema={articleRepository.articleSchema}
              btn="Creer"
              onSubmit={ (data: IArticle) => articleRepository.createArticle(data)
                .then(() => articleRepository.fetchArticles())
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              }
            />
          )}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer un article</span>
        </button>
      </div>
      <hr />
      <div className="table-responsive">
        <table className={`table table-sm table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col" className="col-md-1">Image</th>
              <th scope="col" className="col-md-3">Nom</th>
              <th scope="col" className="col-md-1">Prix</th>
              <th scope="col" className="col-md-1">Type</th>
              <th scope="col" className="col-md-1">Categorie</th>
              <th scope="col" className="col-md-2 text-center">Status</th>
              <th scope="col" className="col-md-2 text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              articles.map((article: IArticle) => (
                <tr key={article.id} className="align-middle">
                  <td scope="row" className="col-md-1">
                    <img 
                      src={article.image} 
                      alt={article.name} 
                      className="img-fluid rounded" 
                    />
                  </td>
                  <td scope="row" className="col-md-3 text-break">{article.name}</td>
                  <td scope="row" className="col-md-1">{article.price}</td>
                  <td scope="row" className="col-md-1">{article.typeId}</td>
                  <td scope="row" className="col-md-1">{article.categoryId}</td>
                  <td scope="row" className="col-md-2 text-center">
                    <button type="button" className={`btn btn-${statusColorRender(article.status)} btn-sm`}>
                      <span className="me-2">{statusRender(article.status)}</span>
                      <Dropdown
                        chevron
                        options={statusOptions.map((status) => ({
                          label: statusRender(status),
                          action: () => modal.open(
                            <ConfirmComponent 
                              title={articleRepository.confirmChangeStatusArticle.title}
                              description={articleRepository.confirmChangeStatusArticle.description}
                              onConfirm={ () => articleRepository.changeStatusArticle(article.id as number, status)
                                .then(() => articleRepository.fetchArticles())
                                .catch((error) => console.error(error))
                                .finally(() => modal.close())
                              }
                            />
                          ),
                        }))}
                      />
                    </button>
                  </td>
                  <td scope="row" className="col-md-2 text-end">
                    <i 
                      className="bi bi-pencil text-primary me-md-2"
                      onClick={() => modal.open(
                        <SubmitComponent 
                          title="Modifier l'article"
                          fields={articleRepository.formUpdateArticle(article) as unknown as IField[]}
                          schema={articleRepository.articleSchema}
                          btn="Modifier"
                          onSubmit={ (data: IArticle) => articleRepository.updateArticle(article.id as number, data)
                            .then(() => articleRepository.fetchArticles())
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
                          title={articleRepository.confirmDeleteArticle.title}
                          description={articleRepository.confirmDeleteArticle.description}
                          onConfirm={ () => articleRepository.deleteArticle(article.id as number)
                            .then(() => articleRepository.fetchArticles())
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
      </div>
    </div>
  );
};

export default Page;