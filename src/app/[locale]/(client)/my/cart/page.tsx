"use client";
import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { clearCart, priceAccomp, useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from 'nextjs-toploader/app';
import { useAuthStore } from "@/stores/useAuthStore";
import { MetaResponse } from "@/core/types";
import ArticleRepository from "@/frontend/repositories/article.repository";
import CategoryRepository from "@/frontend/repositories/category.repository";
import { IArticle, ICategory } from "@/core/interfaces";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import { metaResponse } from "@/core";

const LazyCartItemsBlock = lazy(() => import("@/components/blocks/CartItemsBlock"));

const Page: React.FC = () => {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const { lang } = useLangStore();
  const { cart } = useCartStore();
  const [articles, setArticles] = useState<MetaResponse<IArticle>>(metaResponse);
  const [categories, setCategories] = useState<MetaResponse<ICategory>>(metaResponse);
  
  const articleRepository = useMemo(() => new ArticleRepository(), []);
  const categoryRepository = useMemo(() => new CategoryRepository(), []);

  useEffect(() => {
    articleRepository.fetchArticles({take: 100}, (data) => setArticles(data));
    categoryRepository.fetchCategories({ orderBy: 'id', sort: 'asc' }, (data) => setCategories(data));
  }, [articleRepository, categoryRepository]);
  
  useEffect(() => {
  }, [cart]);


  const clear = () => {
    clearCart();
    router.push('/' + lang);
  };


  const goToNext = (): void => {
    if (!isAuthenticated) {
      router.push('/' + lang+ '/login');
    } else {
      router.push('/' + lang+ '/my/cart/planning');
    }
  }
  return (
    <div className={`card p-3 text-bg-${theme}`}>
      <div className="d-flex justify-content-between mb-3">
        <h5 className="card-title text-break">
          Total :
          { cart.length > 0 ?
            cart.reduce((sum, item) => {
              return sum + (((articles.data.filter(el => el.categoryId != 5).find(a => a.id === item.id)?.price || 0) 
              + priceAccomp(articles.data.filter(el => el.categoryId == 5), item)))
            }, 0).toFixed(2)
          : 0} XOF
        </h5>
        {cart.length > 0 && 
        <div className="d-flex gap-3">
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={clear}>
            <i className="bi bi-trash"></i>
            <span className="d-none d-md-inline-block ms-2 fw-bold">Vider le panier</span>
          </button>
          <button type="button" className="btn btn-sm btn-primary" onClick={goToNext}>
            <span className="d-none d-md-inline-block fw-bold me-2">Suivant</span>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        }
      </div>
      { cart.length > 0 ?
        <Suspense fallback={<BlockSkeleton count={1} multiple className={`card mb-3 text-bg-${theme} h-100`} />}>
          <LazyCartItemsBlock
            categories={categories.data.filter(el => el.id != 5)} 
            articlesPrincipal={articles.data.filter(el => el.categoryId != 5)} 
            articlesAccompagnement={articles.data.filter(el => el.categoryId == 5)} 
          />
        </Suspense>
        :
        <div className={`card mb-3 text-bg-${theme} h-100`}>
          <div className="card-body text-center">
            <p className="card-text">Panier vide</p>

            <button type="button" className="btn btn-sm btn-primary mt-3" onClick={() => router.push('/' + lang)}>
              <i className="bi bi-arrow-left"></i>
              <span className="d-none d-md-inline-block ms-2 fw-bold">Retour à l&apos;accueil</span>
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Page;