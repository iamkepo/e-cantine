import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { filterCartByCategory, setSubtotal, useCartStore } from '../stores/cartStore';
import { categories } from '../helpers/constants';
import CartItem from '../components/widgets/CartItem';

const CartView: React.FC = () => {
  const { theme } = useThemeStore();
  const { cart } = useCartStore();

  useEffect(() => {
    setSubtotal();
  }, [cart]);

  return (
    categories.map((category) =>
      filterCartByCategory(category.id as number).length > 0 ? (
        <div key={category.id} className={`card mb-3 text-bg-${theme}`}>
          <div className="card-body">
            <h5 className="card-title mb-3">{category.label}</h5>
            {filterCartByCategory(category.id as number).map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : null
    )
  );
};

export default CartView;