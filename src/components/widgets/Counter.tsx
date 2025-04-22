import React from 'react';
import { useThemeStore } from '../../stores/themeStore';
import { decrementItemCount, incrementItemCount } from '../../stores/cartStore';
import { Cart } from '../../core/types';


const Counter: React.FC<{
  item: Cart;
}> = ({ item }) => {
  const { theme } = useThemeStore();

  return (
    <div className="input-group">
      <button
        className={`btn text-bg-secondary btn-sm`}
        type="button"
        onClick={() => decrementItemCount(item.id as number)}
      >
        <i className="bi bi-dash"></i>
      </button>
      <input
        type="text"
        className={`form-control form-control-sm text-center text-bg-${theme}`}
        value={item.count}
        readOnly
      />
      <button
        className={`btn text-bg-secondary btn-sm`}
        type="button"
        onClick={() => incrementItemCount(item.id as number)}
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};

export default Counter;