"use client";
import React from "react";
import AddPersonModal from "@/components/AddPersonModal";
import LoaderComponent from "@/components/LoaderComponent";
import PaymentSection from "@/components/PaymentSection";
import RecapSection from "@/components/RecapSection";
import RemovePersonModal from "@/components/RemovePersonModal";
import { articlesBoisson, articlesPrincipal, articlesSupplement, methods, SHIPPING_RATE, TAX } from "@/core/constants";
import { modal, toast } from "@/stores/appStore";
import { clearCart, setPerson, setSubtotal } from "@/stores/cartStore";
import { createCommand, createHistory } from "@/stores/historyStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "next/navigation";

const Page:React.FC = () => {
  const { theme } = useThemeStore();
  const { cart, subtotal, dates, events, persons, checkedDays, startDate } = useCartStore();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    paymentMethod: '',
    promoCode: '',
    address: '',
    persons: persons || [],
  });
  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const commandId = createCommand({
      ...form,
      weeks: dates?.length || 0,
      checkedDays: checkedDays,
      startDate: startDate,
      subtotal: subtotal,
      shipping: SHIPPING_RATE * (dates?.length || 0),
      tax: TAX,
      total: subtotal + SHIPPING_RATE * (dates?.length || 0) + TAX,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'paid',
      cart: cart,
    });
    createHistory(commandId, events || []);
    modal.open(<LoaderComponent counter={1500} callback={() => {
      toast.success('Commande effectuée avec succès');
      setLoading(false)
      clearCart();
      modal.close();
      router.push('/'+lang+'/orders');
    }} />);
  };

  useEffect(() => {
    if (!user?.email) return;
    if (!persons?.length || !persons?.includes(user?.email)) {
      setPerson([user?.email || '']);
    }
  }, [user?.email, persons]);

  useEffect(() => {
    setSubtotal(articlesPrincipal, articlesSupplement, articlesBoisson);
  }, [cart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
      <div className="row">
        <div className="col-lg-8 mb-3 mb-lg-0">
        <RecapSection 
          cart={cart}
          persons={persons || []}
          events={events}
          user={user}
          theme={theme}
          subtotal={subtotal}
          dates={dates}
          shipping={SHIPPING_RATE * (dates?.length || 0)}
          tax={TAX}
          addPerson={() => modal.open(<AddPersonModal />)}
          removePerson={(email: string) => modal.open(<RemovePersonModal email={email}/>)}
        />
      </div>
      <div className="col-lg-4">
        <PaymentSection 
          persons={persons || []}
          form={form}
          handleChange={handleChange}
          methods={methods}
          theme={theme}
          loading={loading}
          handlePay={handlePay}
          addPerson={() => modal.open(<AddPersonModal />)}
        />
      </div>
    </div>
  );
};

export default Page;