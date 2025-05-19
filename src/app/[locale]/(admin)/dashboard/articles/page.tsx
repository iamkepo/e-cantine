"use client";

import { modal } from "@/stores/appStore";
import { IArticle, Meta } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { statusOptionsActivation } from "@/enums";
import ArticleRepository from "@/repositories/articleRepository";
import { IField } from "@/components/FormComponent";
import SubmitComponent from "@/components/SubmitComponent";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";
import { TableComponent } from "@/components/TableComponent";
import { useCheckList } from "@/hooks/useCheckList";
import { meta } from "@/core/constants";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";

const Page: React.FC = () => {
  const [articles, setArticles] = useState<{ data: IArticle[], meta: Meta }>({ data: [], meta});
  const statusOptions = Object.values(statusOptionsActivation);
  const articleRepository = useMemo(() => new ArticleRepository(setArticles), []);
  const [params, setParams] = useState(articleRepository.filterArticle);
  const { checkList, checkAllList, handleCheckList } = useCheckList(articles.data.map(article => article.id as number));

  useEffect(() => {
    articleRepository.fetchArticles(params);
  }, [articleRepository, params]);


  return (
    <div className="col-12">

      <div className="row">
        <div className="col-12 col-md-3">
          <h4 className="card-title text-break">Liste des articles</h4>
        </div>
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-12 col-md-9">
              <FilterComponent 
                fields={articleRepository.formFilterArticle() as unknown as IField[]}
                schema={articleRepository.articleFilterSchema}
                onSubmit={(data: {search: string, status: string, categoryId: string, typeId: string}) => {
                  setParams({
                    ...params,
                    search: data.search,
                    status: data.status,
                    categoryId: parseInt(data.categoryId),
                    typeId: parseInt(data.typeId),
                  });
                }}
              />
            </div>
            <div className="col-12 col-md-3 text-end">
              {
                checkList.length > 0 ? 
                <BtnConfirmComponent 
                  btn={{ label: `Supprimer ${checkList.length} articles`, color: "danger", icon: "trash" }}
                  confirm={articleRepository.confirmDeleteArticles}
                  onConfirm={() => articleRepository.deleteArticles(checkList)
                    .then(() => articleRepository.fetchArticles(params))
                    .then(() => checkAllList())
                    .catch((error) => console.error(error))
                    .finally(() => modal.close())
                  }
                />
               :
                <BtnSubmitComponent 
                  btn={{ label: "Creer un article", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer un article",
                    btn:"Creer",
                    fields:articleRepository.formCreateArticle() as unknown as IField[],
                    schema:articleRepository.articleSchema
                  }}
                  onSubmit={ (data: IArticle) => articleRepository.createArticle(data)
                    .then(() => articleRepository.fetchArticles(params))
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
          thead={articleRepository.tableHeadArticle}
          list={articles.data}
          setList={(e: IArticle[]) => setArticles({...articles, data: e})}
          // eye={(e: IArticle) => false}
          edit={(e: IArticle) => modal.open(
            <SubmitComponent 
              title={"Update article"} 
              fields={articleRepository.formUpdateArticle(e) as unknown as IField[]} 
              schema={articleRepository.articleSchema} 
              btn="Update" 
              onSubmit={(data) => articleRepository.updateArticle(e.id as number, data)
                .then(() => articleRepository.fetchArticles(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          trash={(id: number) => modal.open(
            <ConfirmComponent 
              title={articleRepository.confirmDeleteArticle.title}
              description={articleRepository.confirmDeleteArticle.description}
              onConfirm={() => articleRepository.deleteArticle(id)
                .then(() => articleRepository.fetchArticles(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          options={statusOptions.map(status => ({
            label: status,
            action: (id: number) => modal.open(
              <ConfirmComponent 
                title={articleRepository.confirmChangeStatusArticle.title}
                description={articleRepository.confirmChangeStatusArticle.description}
                onConfirm={ () => articleRepository.changeStatusArticle(id, status)
                  .then(() => articleRepository.fetchArticles(params))
                  .catch((error) => console.error(error))
                  .finally(() => modal.close())
                }
              />
            )}
          ))}
        />
          
        <PaginationComponent 
          page={params.page}
          total={articles.meta.pageCount}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;