import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { filterCartByCategory, setSubtotal, useCartStore } from '../stores/cartStore';
import { categories } from '../helpers/constants';
import CartItem from '../components/widgets/CartItem';
import OrderSummary from '../components/widgets/OrderSummary';

const CartView: React.FC = () => {
  const { theme } = useThemeStore();
  const { cart, subtotal } = useCartStore();
  const shipping = 10.0;
  const tax = 20.0;


  useEffect(() => {
    setSubtotal();
  }, [cart]);

  return (
    <div className="col-12 col-lg-11 p-3 mx-auto">
    <div className="d-flex mt-4">
      <button
        type="button"
        className="btn btn-outline-primary mb-4 me-5"
        onClick={() => window.history.back()}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <h3>Your Shopping Cart</h3>
    </div>
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
                setSubtotal();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartView;