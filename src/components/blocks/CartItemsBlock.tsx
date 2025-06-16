"use client";
import { IArticle, ICategory } from "@/core/interfaces";
import CartItemComponent from "../CartItemComponent";
import { useThemeStore } from "@/stores/themeStore";
import { useCartStore } from "@/stores/cartStore";
import { modal } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useLangStore } from "@/stores/langStore";
import ConfirmComponent from "../ConfirmComponent";

interface CartItemsBlockProps {
  categories: ICategory[];
  articlesPrincipal: IArticle[];
  articlesAccompagnement: IArticle[];
}

const CartItemsBlock: React.FC<CartItemsBlockProps> = ({ categories, articlesPrincipal, articlesAccompagnement }) => {
  const { theme } = useThemeStore();
  const { cart } = useCartStore();
  const router = useRouter();
  const { lang } = useLangStore();
  const [missingCategories, setMissingCategories] = useState<{ id: number; name: string; checked: boolean }[]>([]);


  useEffect(() => {
    const updated = categories
      .filter((category) => category.id != null)
      .filter((category) => category.id != 5)
      .map((category) => ({ 
        id: category.id as number, 
        name: category.name, 
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
    modal.open(<ConfirmComponent
      title="Ignorer la catégorie"
      description={`Êtes-vous sûr de vouloir ignorer la catégorie "${category.name}" ?`}
      onConfirm={() => {
        setMissingCategories((prev) =>
          prev.map((item) => item.id === category.id ? { ...item, checked: true } : item)
        );
        modal.close()
      }}
    />)
  };

  return (
    <ul className="list-group">
    {missingCategories.map((category) =>
      <li key={category.id} className={`list-group-item text-bg-${theme}`}>
        <div className="d-flex justify-content-between">
          <h5 className="card-title mb-3">{category.name}</h5>
          { category.checked ? 
            <i className="bi bi-check2-square"></i> 
            :
            <div className="">
              <button 
                type="button" 
                className="btn btn-sm btn-outline-success ms-2" 
                onClick={() => handleCategory(category.id as number)}
              >
                <i className="bi bi-plus me-2"></i>
                <span className="d-none d-md-inline-block">Ajouter</span>
              </button>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-secondary ms-2" 
                onClick={() => ignoreCategory(category)}
              >
                <i className="bi bi-x me-2"></i>
                <span className="d-none d-md-inline-block">Ignorer</span>
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
          ))}
      </li>
    )}
    </ul>
  );
};

export default CartItemsBlock;
