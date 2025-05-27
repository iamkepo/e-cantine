"use client";
import { Cart } from "@/core/types";
import { IArticle, ICategory } from "@/core/interfaces";
import CartItemComponent from "../CartItemComponent";
import { useThemeStore } from "@/stores/themeStore";

interface CartItemsBlockProps {
  items: Cart[];
  categories: ICategory[];
  articlesPrincipal: IArticle[];
  articlesAccompagnement: IArticle[];
}

const CartItemsBlock: React.FC<CartItemsBlockProps> = ({ items, categories, articlesPrincipal, articlesAccompagnement }) => {
  const { theme } = useThemeStore();

  const filterCartByCategory = (category: number) => {
    return items.filter((item) => articlesPrincipal.find(a => a.id === item.id)?.categoryId === category); // Ensure `category` exists on items
  };

  return (
    categories.map((category) =>
      filterCartByCategory(category.id as number).length > 0 ? (
        <div key={category.id} className={`card mb-3 text-bg-${theme}`}>
          <div className="card-body">
            <h5 className="card-title mb-3">{category.name}</h5>
            {filterCartByCategory(category.id as number).map((item) => (
              <CartItemComponent 
                key={item.id} 
                item={articlesPrincipal.find(a => a.id === item.id) as IArticle} 
                articles={articlesAccompagnement}
              />
            ))}
          </div>
        </div>
      ) : null
    )
  );
};

export default CartItemsBlock;
