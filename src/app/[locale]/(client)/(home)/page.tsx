"use client";
import React, { Suspense, useMemo, lazy, useEffect, useState } from "react";
import { useFilterStore } from "@/stores/filterStore";
import { IArticle } from "@/core/interfaces";
import ArticleHComponent from "@/components/ArticleHComponent";
import { findItem, addItemCart, removeItemCart, useCartStore } from "@/stores/cartStore";
import { modal } from "@/stores/appStore";
import ArticleRepository from "@/repositories/articleRepository";
import LightBox from "@/components/widgets/LightBox";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import { MetaResponse } from "@/core/types";
import { metaResponse } from "@/core/constants";
import { usePathname } from "next/navigation";

const LazyArticlesBlock = lazy(() => import("@/components/blocks/ArticlesBlock"));

const Page: React.FC = () => {
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const route = usePathname();
  const [articles, setArticles] = useState<MetaResponse<IArticle>>(metaResponse);
  const articleRepository = useMemo(() => new ArticleRepository(), []);

  useEffect(() => {
    articleRepository.fetchArticles({
      take: 100,
      search: selected.query,
      tagIds: selected.tagIds || [],
      typeId: 1,
      price: selected.price || undefined,
    }, (data) => setArticles(data));
  }, [articleRepository, selected, cart, route]); // Only depend on what we actually use

  const openLightBox = (article: IArticle, i: number) => {
    modal.open(
      <LightBox list={articles.data} index={i} open={openLightBox}>  
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
          articles={articles.data} 
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