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

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [articles, setArticles] = useState<IArticle[]>([]);

  const statusOptions = Object.values(statusOptionsActivation);
  const articleRepository = useMemo(() => new ArticleRepository(), []);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await articleRepository.fetchArticles();
      setArticles(data as IArticle[]);
    };
    fetchArticles();
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
              onSubmit={async (data: IArticle) => {
                setArticles((await articleRepository.createArticle(data)) as IArticle[]);
                modal.close();
              }}
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
              <th scope="col" className="col-md-4">Nom</th>
              <th scope="col" className="col-md-2">Prix</th>
              <th scope="col" className="col-md-3 text-center">Status</th>
              <th scope="col" className="col-md-2 text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              articles.map((article: IArticle) => (
                <tr key={article.id}>
                  <td scope="row" className="col-md-1">
                    <img 
                      src={article.image} 
                      alt={article.name} 
                      className="img-fluid rounded" 
                    />
                  </td>
                  <td scope="row" className="col-md-4 text-break">{article.name}</td>
                  <td scope="row" className="col-md-2">{article.price}</td>
                  <td scope="row" className="col-md-3 text-center">
                    <span className={`badge text-bg-${statusColorRender(article.status)}`}>
                      {statusRender(article.status)}
                    </span>
                    <Dropdown
                      options={statusOptions.map((status) => ({
                        label: statusRender(status),
                        action: () => modal.open(
                          <SubmitComponent 
                            title="Changer le status"
                            fields={articleRepository.formChangeStatusArticle() as unknown as IField[]}
                            schema={articleRepository.articleSchema}
                            btn="Changer"
                            onSubmit={async () => {
                              setArticles((await articleRepository.changeStatusArticle(article.id as number, status)) as IArticle[]);
                              modal.close();
                            }}
                          />
                        ),
                      }))}
                    />
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
                          onSubmit={async (data: IArticle) => {
                            setArticles((await articleRepository.updateArticle(article.id as number, data)) as IArticle[]);
                            modal.close();
                          }}
                        />
                      )}
                    ></i>
                    <i 
                      className="bi bi-trash text-danger"
                      onClick={() => modal.open(
                        <SubmitComponent 
                          title="Supprimer l'article"
                          fields={articleRepository.formDeleteArticle() as unknown as IField[]}
                          schema={articleRepository.articleSchema}
                          btn="Supprimer"
                          onSubmit={async () => {
                            setArticles((await articleRepository.deleteArticle(article.id as number)) as IArticle[]);
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