"use client";
import React, { useMemo, useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useFilterStore } from "@/stores/filterStore";
import { useCartStore, findItem, addItemCart, removeItemCart } from "@/stores/cartStore";
import { IArticle } from "@/core/interfaces";
import { MetaResponse } from "@/core/types";
import { metaResponse } from "@/core/constants";
import { usePathname } from "next/navigation";
import ArticleRepository from "@/frontend/repositories/article.repository";
import LightBox from "@/components/widgets/LightBox";
import ArticleHComponent from "@/components/ArticleHComponent";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import { modal } from "@/stores/appStore";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"; // 👈 le hook ici
import SpinnerComponent from "@/components/SpinnerComponent";

const LazyArticlesBlock = lazy(() => import("@/components/blocks/ArticlesBlock"));

const Page: React.FC = () => {
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const route = usePathname();

  const [articles, setArticles] = useState<MetaResponse<IArticle>>(metaResponse);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const articleRepository = useMemo(() => new ArticleRepository(), []);

  const fetchPage = useCallback((currentPage: number) => {
    if (currentPage > articles.meta.pageCount) return;
    setLoading(true);
    articleRepository.fetchArticles({
      search: selected.query,
      tagIds: selected.tagIds || [],
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
  }, [articleRepository, selected.query, selected.tagIds, selected.price, articles.meta.pageCount]);

  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    if (page > 1) fetchPage(page);
  }, [page, fetchPage, cart, route, selected]);

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
          choose={findItem(article.id as number) !== undefined}
          addItem={(id) => {
            addItemCart(id);
            openLightBox(article, i);
          }}
          removeItem={(id) => {
            removeItemCart(id);
            openLightBox(article, i);
          }}
        />
      </LightBox>,
      "xl"
    );
  };

  return (
    <div className="col-12 col-md-8 col-lg-9">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4 mb-4">
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

      { page < articles.meta.pageCount && <SpinnerComponent done={loading} />}

      {/* Target element for infinite scroll */}
      <div ref={observerRef} style={{ height: 1 }} /> 
    </div>
  );
};

export default Page;