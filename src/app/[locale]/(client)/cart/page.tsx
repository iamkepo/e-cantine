"use client";
import React from "react";
import { clearCart, priceAccomp, priceBoisson, useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { articlesBoisson, articlesPrincipal, articlesSupplement, categories } from "@/core/constants";
import CartItem from "@/components/widgets/CartItem";
import Link from "next/link";
import { Article } from "@/core/types";

const Page: React.FC = () => {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const { lang } = useLangStore();
  const { cart } = useCartStore();


  useEffect(() => {
  }, [cart]);

  const handleValidateCart = () => {
    if (!isAuthenticated) {
      router.push('/' + lang + '/login');
    } else {
      router.push('/' + lang + '/cart/planning');
    }
  };

  function handleCategory(id: number): void {
    router.push('/' + lang + '/filter/' + id)
  }
  const clear = () => {
    clearCart();
    router.push('/' + lang + '/filter');
  };
  const filterCartByCategory = (category: number) => {
    return cart.filter((item) => articlesPrincipal.find(a => a.id === item.id)?.category === category); // Ensure `category` exists on items
  };
  return (
    <div className="row">
      <div className="col-lg-8">
        {categories.map((category) =>
          filterCartByCategory(category.id as number).length > 0 ? (
            <div key={category.id} className={`card mb-3 text-bg-${theme}`}>
              <div className="card-body">
                <h5 className="card-title mb-3">{category.label}</h5>
                {filterCartByCategory(category.id as number).map((item) => (
                  <CartItem key={item.id} item={articlesPrincipal.find(a => a.id === item.id) as Article} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
      <div className="col-lg-4">
        <div className={`card p-3 text-bg-${theme} sticky-lg-top`}>
          <h5 className="card-title mb-3">Plats manquants</h5>
          {cart.length > 0 && <button className="position-absolute top-0 end-0 btn btn-sm btn-outline-danger m-3" onClick={clear}>Vider le panier</button>}
          <ul className='list-group'>
            {categories.filter(category => category.id != null).map((category) =>
              filterCartByCategory(category.id as number).length == 0 ? (
                <li key={category.id} className={`list-group-item bg-${theme}`}>
                  <span className="text-danger">{category.label}</span>
                  <button className="btn btn-sm btn-outline-success ms-2" onClick={() => handleCategory(category.id as number)}>Ajouter</button>
                  <button className="btn btn-sm btn-outline-secondary ms-2">Ignorer</button>
                </li>
              ) : (
                <li key={category.id} className={`list-group-item text-bg-${theme}`}>
                  <span>{category.label}</span> 
                  <i className="bi bi-check2-square ms-2"></i>
                </li>
              )
            )}
          </ul>
          <hr />
          <p className="fw-bold">
            Total :
            { cart.length > 0 ?
              cart.reduce((sum, item) => {
                return sum + ((articlesPrincipal.find(a => a.id === item.id)?.price || 0) 
                + priceAccomp(articlesSupplement, item) 
                + priceBoisson(articlesBoisson, item))
              }, 0).toFixed(2)
            : 0} XOF
          </p>
          <div className="d-flex justify-content-between">
            <Link className="btn btn-secondary" href={'/'+lang+'/filter'}>Retour</Link>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleValidateCart}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;