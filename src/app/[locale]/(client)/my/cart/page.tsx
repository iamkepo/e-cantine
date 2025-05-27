"use client";
import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { clearCart, priceAccomp, useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { meta } from "@/core/constants";
import { Meta } from "@/core/types";
import { modal } from "@/stores/appStore";
import ArticleRepository from "@/repositories/articleRepository";
import CategoryRepository from "@/repositories/categoryRepository";
import { IArticle, ICategory } from "@/core/interfaces";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import Link from "next/link";

const LazyCartItemsBlock = lazy(() => import("@/components/blocks/CartItemsBlock"));
const LazyCategoriesListBlock = lazy(() => import("@/components/blocks/CategoriesListBlock"));

const Page: React.FC = () => {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const { lang } = useLangStore();
  const { cart } = useCartStore();
  const [missingCategories, setMissingCategories] = useState<{ id: number; name: string; checked: boolean }[]>([]);
  const [articlesPrincipal, setArticlesPrincipal] = useState<{ data: IArticle[], meta: Meta }>({ data: [], meta});
  const [articlesAccompagnement, setArticlesAccompagnement] = useState<{ data: IArticle[], meta: Meta }>({ data: [], meta});
  const articleRepository = useMemo(() => new ArticleRepository(), []);
  const [categories, setCategories] = useState<{ data: ICategory[], meta: Meta }>({ data: [], meta});
  const categoryRepository = useMemo(() => new CategoryRepository(setCategories), []);

  useEffect(() => {
    articleRepository.fetchArticles({take: 100})
    .then(data => {
      setArticlesAccompagnement(data ? {data: data.data.filter(el => el.id == 5), meta: data.meta} : {data: [], meta: meta});
      setArticlesPrincipal(data ? {data: data.data.filter(el => el.id != 5), meta: data.meta} : {data: [], meta: meta});
    });
    categoryRepository.fetchCategories({ orderBy: 'id', order: 'asc' });
  }, [articleRepository, categoryRepository]);
  
  useEffect(() => {
    const updated = categories.data
      .filter((category) => category.id != null)
      .filter((category) => category.id != 5)
      .map((category) => ({ 
        id: category.id as number, 
        name: category.name, 
        checked: cart.filter(el => articlesPrincipal.data.find(a => a.id === el.id)?.categoryId === category.id).length > 0 
      }));
      
    setMissingCategories(updated);
  }, [cart, articlesPrincipal, categories]);

  const handleCategory = (id: number): void => {
    router.push('/' + lang + '/' + id)
  }
  const clear = () => {
    clearCart();
    router.push('/' + lang);
  };

  const ignoreCategory = (category: number) => {
    modal.open(
      <div className="text-center">
        <p>Êtes-vous sûr de vouloir ignorer la catégorie {categories.data.find(c => c.id === category)?.name} ?</p>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-danger" onClick={() => modal.close()}>Non</button>
          <button type="button" className="btn btn-outline-primary" onClick={() => {
            setMissingCategories((prev) =>
              prev.map((item) => item.id === category ? { ...item, checked: true } : item)
            );
            modal.close()
          }}>Oui</button>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-lg-8 mb-3 mb-lg-0">
        { cart.length > 0 ?
          <Suspense fallback={<BlockSkeleton count={1} multiple className={`card mb-3 text-bg-${theme} h-100`} />}>
            <LazyCartItemsBlock 
              items={cart} 
              categories={categories.data} 
              articlesPrincipal={articlesPrincipal.data} 
              articlesAccompagnement={articlesAccompagnement.data} 
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
      <div className="col-lg-4">
        <div className={`card p-3 text-bg-${theme} sticky-lg-top`}>
          <div className="d-flex justify-content-between mb-3">
            <h5 className="card-title text-break">Plats manquants</h5>
            {cart.length > 0 && 
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={clear}>
              <i className="bi bi-trash"></i>
              <span className="d-none d-md-inline-block ms-2 fw-bold">Vider le panier</span>
            </button>}
          </div>
          <ul className='list-group'>
            <Suspense fallback={<BlockSkeleton count={4} className={`list-group-item text-bg-${theme}`} />}>
              <LazyCategoriesListBlock 
                missingCategories={missingCategories} 
                handleCategory={handleCategory}
                ignoreCategory={ignoreCategory}
              />
            </Suspense>
          </ul>
          <hr />
          <p className="fw-bold">
            Total :
            { cart.length > 0 ?
              cart.reduce((sum, item) => {
                return sum + ((articlesPrincipal.data.find(a => a.id === item.id)?.price || 0) 
                + priceAccomp(articlesAccompagnement.data, item))
              }, 0).toFixed(2)
            : 0} XOF
          </p>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Retour</button>
            {cart.length > 0 ?
              <Link
                href={'/'+lang+(isAuthenticated ? '/my/cart/planning' : '/login')}
                className="btn btn-primary"
              >
                Suivant
              </Link>
              :
              <button type="button" className="btn btn-primary" disabled>
                Suivant
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;