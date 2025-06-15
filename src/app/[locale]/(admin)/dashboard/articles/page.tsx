"use client";

import { modal, toast } from "@/stores/appStore";
import { IArticle, ICategory, IType } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { StatusActivation } from "@/enums";
import SubmitComponent from "@/components/SubmitComponent";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";
import TableComponent from "@/components/TableComponent";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";
import ArticleComponent from "@/components/ArticleComponent";
import { useCheckList } from "@/hooks/useCheckList";
import { Field, ParamsQuery, MetaResponse } from "@/core/types";
import ArticleRepository from "@/repositories/articleRepository";
import CategoryRepository from "@/repositories/categoryRepository";
import TypeRepository from "@/repositories/typeRepository";

const Page: React.FC = () => {
  const statusOptions = Object.values(StatusActivation);
  const [articles, setArticles] = useState<MetaResponse<IArticle>>();
  const [categories, setCategories] = useState<MetaResponse<ICategory>>();
  const [types, setTypes] = useState<MetaResponse<IType>>();
  
  const articleRepository = useMemo(() => new ArticleRepository(), []);
  const categoryRepository = useMemo(() => new CategoryRepository(), []);
  const typeRepository = useMemo(() => new TypeRepository(), []);
  const [params, setParams] = useState<ParamsQuery & { categoryId?: string, typeId?: string }>(articleRepository.filterArticle);
  const { checkList, checkAllList, handleCheckList } = useCheckList((articles?.data as IArticle[])?.map(article => article.id as number));

  useEffect(() => {
    articleRepository.fetchArticles(params as ParamsQuery, setArticles);
    categoryRepository.fetchCategories({}, setCategories);
    typeRepository.fetchTypes({}, setTypes);
  }, [articleRepository, categoryRepository, params, typeRepository]);


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
                fields={articleRepository.formFilterArticle((types?.data as IType[]), (categories?.data as ICategory[])) as unknown as Field[]}
                schema={articleRepository.articleFilterSchema}
                onSubmit={(data: {search: string, status: string, categoryId: string, typeId: string}) => {
                  setParams({
                    ...params,
                    search: data.search,
                    status: data.status,
                    categoryId: data.categoryId,
                    typeId: data.typeId,
                  });
                }}
              />
            </div>
            <div className="col-12 col-md-3 text-end">
              {
                checkList.length > 0 ? 
                <BtnConfirmComponent 
                  btn={{ label: `Supprimer (${checkList.length})`, color: "danger", icon: "trash" }}
                  confirm={articleRepository.confirmDeleteArticles}
                  onConfirm={() => articleRepository.deleteArticles(checkList,
                    () => {
                      toast.success("Articles supprimees"); 
                      articleRepository.fetchArticles(params as ParamsQuery, setArticles); 
                      checkAllList(); 
                      modal.close()
                    })
                  }
                />
               :
                <BtnSubmitComponent 
                  btn={{ label: "Creer", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer un article",
                    btn:"Creer",
                    fields:articleRepository.formCreateArticle((types?.data as IType[]), (categories?.data as ICategory[])) as unknown as Field[],
                    schema:articleRepository.articleSchema
                  }}
                  onSubmit={ (data: IArticle) => articleRepository.createArticle(data,
                    () => {
                      toast.success("Article cree"); 
                      articleRepository.fetchArticles(params as ParamsQuery, setArticles); 
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
          thead={articleRepository.tableHeadArticle}
          list={(articles?.data as IArticle[])}
          orderBy={{
            orderBy: params.orderBy || 'createdAt',
            sort: params.sort || 'desc',
            onChange: (orderBy: string, sort: string) => setParams({...params, orderBy, sort})
          }}
          eye={(e: IArticle) => modal.open(
            <ArticleComponent
              article={e}
              horizontal
            />, 'lg'
          )}
          edit={(e: IArticle) => modal.open(
            <SubmitComponent 
              title={"Modifier l'article"} 
              fields={articleRepository.formUpdateArticle(e, (types?.data as IType[]), (categories?.data as ICategory[])) as unknown as Field[]} 
              schema={articleRepository.articleSchema} 
              btn="Modifier" 
              onSubmit={(data) => articleRepository.updateArticle(e.id as number, data,
                () => {
                  toast.success("Article modifie"); 
                  articleRepository.fetchArticles(params as ParamsQuery, setArticles); 
                  modal.close()
                })
              } 
            />
          )}
          trash={(id: number) => modal.open(
            <ConfirmComponent 
              title={articleRepository.confirmDeleteArticle.title}
              description={articleRepository.confirmDeleteArticle.description}
              onConfirm={() => articleRepository.deleteArticle(id,
                () => {
                  toast.success("Article supprime"); 
                  articleRepository.fetchArticles(params as ParamsQuery, setArticles); 
                  modal.close()
                })
              } 
            />
          )}
          options={statusOptions.map(status => ({
            label: status,
            action: (id: number) => modal.open(
              <ConfirmComponent 
                title={articleRepository.confirmChangeStatusArticle.title}
                description={articleRepository.confirmChangeStatusArticle.description}
                onConfirm={ () => articleRepository.changeStatusArticle(id, status,
                  () => {
                    toast.success("Article modifie"); 
                    articleRepository.fetchArticles(params as ParamsQuery, setArticles); 
                    modal.close()
                  })
                }
              />
            )}
          ))}
        />
          
        <PaginationComponent 
          page={params.page || 1}
          total={(articles?.meta.pageCount as number)}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;