"use client";
import { useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { listStep } from "@/core/constants";

const CartLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const { subtotal } = useCartStore();
  const { lang } = useLangStore();
  const router = useRouter();

  useEffect(() => {
  }, [subtotal, router]);
  
  return (
    <>
      <div className="col-12">
        <div className="steps-horizontal mx-auto">
          {listStep.map((item) => (
            <div  
              key={item.id}
              className={`step-horizontal ${window.location.pathname.includes(item.path)  ? 'active' : ''}`} // Pass list to updateSteps
            >
              <Link className={`step-icon`} href={'/'+lang+'/client/'+item.path}>
                <i className={`bi bi-${item.icon}`}></i>
              </Link>
              <div className={`${window.location.pathname.includes(item.path) ? 'text-primary' : 'step-description'}`}>
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