"use client";
import { IArticle, ICategory } from "@/core/interfaces";
import CartItemComponent from "../CartItemComponent";
import { useCartStore } from "@/stores/cartStore";
import { modal } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useLangStore } from "@/stores/langStore";
import ConfirmComponent from "../ConfirmComponent";
import Accordion from "../widgets/Accordion";

interface CartItemsBlockProps {
  categories: ICategory[];
  articlesPrincipal: IArticle[];
  articlesAccompagnement: IArticle[];
}

const CartItemsBlock: React.FC<CartItemsBlockProps> = ({ categories, articlesPrincipal, articlesAccompagnement }) => {
  const { cart } = useCartStore();
  const router = useRouter();
  const { lang } = useLangStore();
  const [missingCategories, setMissingCategories] = useState<{ id: number; name: string; checked: boolean; count: number }[]>([]);


  useEffect(() => {
    const updated = categories
      .filter((category) => category.id != null)
      .filter((category) => category.id != 5)
      .map((category) => ({ 
        id: category.id as number, 
        name: category.name, 
        count: cart.filter(el => articlesPrincipal.filter(el => el.categoryId != 5).find(a => a.id === el.id)?.categoryId === category.id).length || 0,
        checked: cart.filter(el => articlesPrincipal.filter(el => el.categoryId != 5).find(a => a.id === el.id)?.categoryId === category.id).length > 0 
      }));
      
    setMissingCategories(updated);
  }, [cart, articlesPrincipal, categories]);

  const filterCartByCategory = (category: number) => {
    return cart.filter((item) => articlesPrincipal.find(a => a.id === item.id)?.categoryId === category); // Ensure `category` exists on items
  };

  const handleCategory = (id: number): void => {
    router.push('/' + lang + '/' + id)
  };

  const ignoreCategory = (category: { id: number; name: string; checked: boolean }) => {
    modal.open(
      <ConfirmComponent
        title="Ignorer la catégorie"
        description={`Êtes-vous sûr de vouloir ignorer la catégorie "${category.name}" ?`}
        onConfirm={() => {
          setMissingCategories((prev) => prev.map((item) => item.id === category.id ? { ...item, checked: true } : item));
          modal.close()
        }}
      />
    )
  };

  return (
    missingCategories.map((category) =>
      <div key={category.id} className="p-2">
          <Accordion
            title={category.name}
            checked={category.count > 0}
            badge={category.count > 0 ? category.count.toString() : ''}
            content={
              <div key={category.id}>
                <div className="text-end">
                { category.checked ? 
                  <button 
                  type="button" 
                  className={`btn btn-sm btn-outline-${category.count > 0 ? 'danger' : 'success'}`}
                  onClick={() => handleCategory(category.id as number)}
                >
                  <i className={`bi bi-${category.count > 0 ? 'trash' : 'check2-square'}`}></i> 
                  <span className="d-none d-md-inline-block ms-2 fw-bold">{category.count > 0 ? 'Supprimer' : 'Valider'}</span>
                </button>
                  :
                  <div className="d-flex gap-2 justify-content-end">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-success" 
                      onClick={() => handleCategory(category.id as number)}
                    >
                      <i className="bi bi-plus"></i>
                      <span className="d-none d-md-inline-block ms-2 fw-bold">Ajouter</span>
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={() => ignoreCategory(category)}
                    >
                      <i className="bi bi-x"></i>
                      <span className="d-none d-md-inline-block ms-2 fw-bold">Ignorer</span>
                    </button>
                  </div>
                }
              </div>
              {filterCartByCategory(category.id as number).map((item) => (
                  <CartItemComponent 
                    key={item.id} 
                    item={articlesPrincipal.find(a => a.id === item.id) as IArticle} 
                    articles={articlesAccompagnement}
                  />
                ))
              }
            </div>
          }
        />
      </div>
    )
  );
};

export default CartItemsBlock;
