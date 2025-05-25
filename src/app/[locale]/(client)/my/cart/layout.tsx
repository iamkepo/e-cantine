"use client";
import { useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { listStep } from "@/core/constants";
import { useAuthStore } from "@/stores/useAuthStore";

const CartLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const { subtotal } = useCartStore();
  const { lang } = useLangStore();
  const router = useRouter();
  const route = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
  }, [subtotal, router, route]);
  
  const handleValidateCart = (path: string) => {
    if (!isAuthenticated) {
      router.push('/' + lang + '/login');
    } else {
      router.push('/' + lang + '/' + path);
    }
  };
  return (
    <div className="col-12">
      <div className="steps-horizontal mx-auto">
        {listStep.map((item) => (
          <div  
            key={item.id}
            className={`step-horizontal ${route.includes(item.path)  ? 'active' : ''}`} // Pass list to updateSteps
          >
            <button type="button" className={`step-icon`} onClick={() => handleValidateCart(item.path)}>
              <i className={`bi bi-${item.icon}`}></i>
            </button>
            <div className={`${route.includes(item.path) ? 'text-primary' : 'step-description'}`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="col-12 mx-auto mt-3">
        {children}
      </div>
    </div>
  );
};

export default CartLayout;