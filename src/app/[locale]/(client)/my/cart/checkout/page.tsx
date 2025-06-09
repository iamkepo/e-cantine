"use client";
import React, { useMemo } from "react";
import AddPersonModal from "@/components/AddPersonModal";
import LoaderComponent from "@/components/LoaderComponent";
import { methods, SHIPPING_RATE, TAX } from "@/core/constants";
import { modal, toast } from "@/stores/appStore";
import { clearCart, removePerson, setPerson, setSubtotal } from "@/stores/cartStore";
import { createCommand, createHistory } from "@/stores/historyStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from 'nextjs-toploader/app';
import Accordion from "@/components/widgets/Accordion";
import { Meta } from "@/core/types";
import { IArticle } from "@/core/interfaces";
import ArticleRepository from "@/repositories/articleRepository";
import useDataFetch from "@/hooks/useDataForm";

const Page:React.FC = () => {
  const { theme } = useThemeStore();
  const { cart, subtotal, dates, events, persons, checkedDays, startDate } = useCartStore();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const articles = useDataFetch<IArticle>(); 
  const articleRepository = useMemo(() => new ArticleRepository(articles), [articles]);

  const [form, setForm] = useState({
    paymentMethod: '',
    promoCode: '',
    address: '',
    persons: persons || [],
  });
  
  useEffect(() => {
    articleRepository.fetchArticles({take: 100});
  }, [articleRepository]);

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
    modal.open(<LoaderComponent counter={2000} callback={() => {
      toast.success('Commande effectuée avec succès');
      setLoading(false)
      clearCart();
      modal.close();
      router.push('/'+lang+'/my/orders');
    }} />);
  };

  useEffect(() => {
    if (!user?.email) return;
    if (!persons?.length || !persons?.includes(user?.email)) {
      setPerson([user?.email || '']);
    }
  }, [user?.email, persons]);

  useEffect(() => {
    setSubtotal((articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.filter(el => el.categoryId != 5), (articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.filter(el => el.categoryId == 5));
  }, [cart, articles.state.get?.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="row">
      <div className="col-lg-8 mb-3 mb-lg-0">
        <div className={`card p-3 text-bg-${theme}`}>
          <h3 className="mb-3">Récapitulatif</h3>
          <div className="d-flex justify-content-between mb-3">
            <span>Nombre de jours</span>
            <span>{dates?.length || 0}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Nombre de livrasons</span>
            <span>{events?.length || 0}</span>
          </div>
          <Accordion 
            title={"Participants" + (persons && persons.length > 0 ? ` (${persons.length})` : '')}
            content={
              <p>
                {persons?.map((person, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`btn btn-sm me-2 mb-2 btn-${user?.email === person ? 'primary' : theme}`}
                  >
                    {person} { user?.email !== person && <i className="bi bi-trash ms-2 text-danger" onClick={() => removePerson(person)}></i>}
                  </button>
                ))}
                <button 
                  type="button"
                  className="btn btn-sm btn-primary mb-2" 
                  onClick={() => modal.open(<AddPersonModal />)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </p>
            }
          />
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <span>Tax</span>
            <span>{TAX.toFixed(2)} XOF</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Shipping</span>
            <span>{SHIPPING_RATE.toFixed(2)} XOF</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} XOF</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4">
            <strong>Total</strong>
            <strong>{(subtotal + SHIPPING_RATE * (dates?.length || 0) + TAX).toFixed(2)} XOF</strong>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className={`card text-bg-${theme} sticky-lg-top`}>
          <form onSubmit={handlePay} className="card-body">
            <h5 className="card-title mb-3">Paiement</h5>
            <h6 className="card-title">Adresse de livraison</h6>
            <div className="input-group mb-3">
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter address"
                value={form.address}
                onChange={e => handleChange(e)}
                required
              />
            </div>

            <h6 className="card-title">Nombre de personnes ({persons?.length || 0})</h6>
            <button type="button" className="btn btn-primary mb-3" onClick={() => modal.open(<AddPersonModal />)}>Inviter un ami(e)</button>
            <h6 className="card-title">Code promo</h6>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter promo code"
                onChange={e => handleChange(e)}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  if (form.promoCode === "DISCOUNT10") {
                    handleChange({ target: { name: 'promoCode', value: '' } });
                  }
                }}
              >
                Apply
              </button>
            </div>
            <h6 className="card-title">Séléctionnez la méthode de paiement</h6>
            <div className="list-group mb-3">
              { methods.map((method) => (
                <div key={method.id} className={`list-group-item text-bg-${theme}`}>
                  <label className={`form-check`}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={form.paymentMethod === method.id}
                      onChange={e => handleChange({ target: { name: 'paymentMethod', value: e.target.value } })}
                    />
                    <span className="form-check-label">
                      {method.label}
                    </span>
                  </label>
                </div>  
              )) }
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Retour</button>
              <button 
                className="btn btn-primary" 
                disabled={loading}
                type="submit"
              >
                Proceed to Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;