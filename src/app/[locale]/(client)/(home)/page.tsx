"use client";
import React, { Suspense, useMemo, lazy } from "react";
import { findItem, useCartStore } from "@/stores/cartStore";
import { useFilterStore } from "@/stores/filterStore";
import { useEffect } from "react";
import { IArticle } from "@/core/interfaces";
import ArticleHComponent from "@/components/ArticleHComponent";
import { addItemCart, removeItemCart } from "@/stores/cartStore";
import { modal } from "@/stores/appStore";
import { usePathname } from "next/navigation";
import ArticleRepository from "@/repositories/articleRepository";
import LightBox from "@/components/widgets/LightBox";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import useDataFetch from "@/hooks/useDataForm";
import { Meta } from "@/core/types";

const LazyArticlesBlock = lazy(() => import("@/components/blocks/ArticlesBlock"));

const Page: React.FC = () => {
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const route = usePathname();
  const articles = useDataFetch<IArticle>(); 
  const repository = useMemo(() => new ArticleRepository(articles.handleData), [articles.handleData]);

  useEffect(() => {
    repository.fetchArticles({
      take: 100,
      search: selected.query,
    });
  }, [selected, cart, route, repository]);

  const openLightBox = (article: IArticle, i: number) => {
    modal.open(
      <LightBox list={(articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.filter(el => el.categoryId != null && el.categoryId != 5)} index={i} open={openLightBox}>  
        <ArticleHComponent 
          article={article} 
          choose={findItem(article.id as number) != undefined} 
          addItem={(id) => {addItemCart(id); openLightBox(article, i);}} 
          removeItem={(id) => {removeItemCart(id); openLightBox(article, i);}} 
        />
      </LightBox>, "xl"
    );
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4">
      <Suspense fallback={<BlockSkeleton multiple image className="col" count={10} />}>
        <LazyArticlesBlock
          articles={(articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.filter(el => el.categoryId != null && el.categoryId != 5)} 
          openLightBox={openLightBox} 
          findItem={findItem}
          addItem={addItemCart}
          removeItem={removeItemCart}
        />
      </Suspense>
    </div>
  );
};


export default Page;