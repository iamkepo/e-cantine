"use client";
import { useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { listStep } from "@/core/constants";

const CartLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const { subtotal } = useCartStore();
  const { lang } = useLangStore();
  const router = useRouter();
  const route = usePathname();

  useEffect(() => {
  }, [subtotal, router, route]);
  
  return (
    <>
      <div className="col-12">
        <div className="steps-horizontal mx-auto">
          {listStep.map((item) => (
            <div  
              key={item.id}
              className={`step-horizontal ${route.includes(item.path)  ? 'active' : ''}`} // Pass list to updateSteps
            >
              <Link className={`step-icon`} href={'/'+lang+'/'+item.path}>
                <i className={`bi bi-${item.icon}`}></i>
              </Link>
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
    </>
  );
};

export default CartLayout;