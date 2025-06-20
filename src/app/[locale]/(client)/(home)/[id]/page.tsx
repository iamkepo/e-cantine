"use client";

import { useParams } from "next/navigation";
import { findItem, useCartStore } from "@/stores/cartStore";
import { useFilterStore } from "@/stores/filterStore";
import { useEffect, useMemo, Suspense, lazy, useState, useCallback } from "react";
import ArticleHComponent from "@/components/ArticleHComponent";
import { addItemCart, removeItemCart } from "@/stores/cartStore";
import LightBox from "@/components/widgets/LightBox";
import { modal } from "@/stores/appStore";
import ArticleRepository from "@/frontend/repositories/article.repository";
import { MetaResponse } from "@/core/types";
import { IArticle } from "@/core/interfaces";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import { metaResponse } from "@/core/constants";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import SpinnerComponent from "@/components/SpinnerComponent";

const LazyArticlesBlock = lazy(() => import("@/components/blocks/ArticlesBlock"));

const Page: React.FC = () => {
  const { id } = useParams();
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const [articles, setArticles] = useState<MetaResponse<IArticle>>(metaResponse);  
  const articleRepository = useMemo(() => new ArticleRepository(), []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);


  const fetchPage = useCallback((currentPage: number) => {
    if (currentPage > articles.meta.pageCount) return;
    setLoading(true);
    articleRepository.fetchArticles({
      search: selected.query,
      tagIds: selected.tagIds || [],
      categoryId: parseInt(id as string),
      typeId: 1,
      price: selected.price || undefined,
      page: currentPage,
    }, (data) => {
      setArticles((prev) => ({
        ...data,
        data: currentPage === 1 ? data.data : [...prev.data, ...data.data],
      }));
      setLoading(false);
    });
  }, [articleRepository, selected.query, selected.tagIds, selected.price, id, articles.meta.pageCount]);

  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    if (page > 1) fetchPage(page);
  }, [page, fetchPage, cart, selected]);

  const observerRef = useInfiniteScroll({
    hasMore: articles.meta.pageCount > page,
    isLoading: loading,
    onLoadMore: () => setPage((prev) => prev + 1),
  });


  const openLightBox = (article: IArticle, i: number) => {
    modal.open(
      <LightBox list={articles.data} index={i} open={openLightBox}>  
        <ArticleHComponent 
          article={article} 
          choose={findItem(article.id as number) != undefined} 
          addItem={(id) => {addItemCart(id); openLightBox(article, i);}} 
          removeItem={(id) => {removeItemCart(id); openLightBox(article, i);}} 
        />
      </LightBox>,
      "xl"
    );
  };



  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4">
        <Suspense fallback={<BlockSkeleton image multiple className="col" count={10} />}>
          <LazyArticlesBlock
            articles={articles.data} 
            openLightBox={openLightBox} 
            findItem={findItem}
            addItem={addItemCart}
            removeItem={removeItemCart}
          />
        </Suspense>
      </div>

      { page < articles.meta.pageCount && <SpinnerComponent done={loading} />}

      <div ref={observerRef} style={{ height: 1 }} />
    </>
  );
};

export default Page;