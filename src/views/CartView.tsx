import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { filterCartByCategory, useCartStore } from '../stores/cartStore';
import { categories } from '../helpers/constants';
import CartItem from '../components/widgets/CartItem';
import OrderSummary from '../components/widgets/OrderSummary';

const CartView: React.FC = () => {
  const { theme } = useThemeStore();
  const { cart } = useCartStore();
  const [subtotal, setSubtotal] = useState(0);
  const shipping = 10.0;
  const tax = 20.0;


  useEffect(() => {
    setSubtotal(cart.reduce((sum, item) => sum + item.count * (item.price || 0), 0));
  }, [cart]);

  return (
    <div className="col-12 col-lg-11 p-3 mx-auto">
      <button
        type="button"
        className="btn btn-outline-primary mb-4"
        onClick={() => window.history.back()}
      >
        <i className="bi bi-chevron-left me-2"></i>
      </button>
      <h3>Your Shopping Cart</h3>
      <div className="row">
        <div className="col-lg-8">
          {categories.map((category) =>
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
          )}
        </div>
        <div className="col-lg-4">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            onApplyPromo={(code) => {
              if (code === "DISCOUNT10") {
                setSubtotal((prev) => prev * 0.9);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartView;