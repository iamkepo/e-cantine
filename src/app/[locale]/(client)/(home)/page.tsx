"use client";
import React, { Suspense, useMemo, useState } from "react";
import { findItem, useCartStore } from "@/stores/cartStore";
import { useFilterStore } from "@/stores/filterStore";
import { useEffect } from "react";
import { IArticle } from "@/core/interfaces";
import ArticleHComponent from "@/components/ArticleHComponent";
import { meta } from "@/core/constants";
import { addItemCart, removeItemCart } from "@/stores/cartStore";
import { modal } from "@/stores/appStore";
import ArticleVComponent from "@/components/ArticleVComponent";
import { usePathname } from "next/navigation";
import ArticleRepository from "@/repositories/articleRepository";
import { Meta } from "@/core/types";
import LightBox from "@/components/widgets/LightBox";
import Loading from "./loading";

const Page: React.FC = () => {
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const route = usePathname();
  const [articles, setArticles] = useState<{ data: IArticle[], meta: Meta }>({ data: [], meta});
  const repository = useMemo(() => new ArticleRepository(setArticles), []);

  useEffect(() => {
    repository.fetchArticles({
      take: 100,
      search: selected.query,
    });
  }, [selected, cart, route, repository]);

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
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <Suspense fallback={<Loading />}>
      {
        articles.data.filter(el => el.categoryId != null && el.categoryId != 5).map((article: IArticle, i) => (
          <div 
            key={i} 
            className="col"
          >
            <ArticleVComponent 
              article={article}
              action={() => openLightBox(article, i)}
              choose={findItem(article.id as number) != undefined}
              addItem={(id) => addItemCart(id)}
              removeItem={(id) => removeItemCart(id)}
            />
          </div>
        ))
      }
      </Suspense>
    </div>
  );
};

export default Page;