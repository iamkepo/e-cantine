"use client";
import React, { useMemo, useState } from "react";
import { days, meta } from "@/core/constants";
import { generatePlanning, removeEvent, setCheckedDays, setDates, setEvents, setItemCount, setStartDate, setWeeks } from "@/stores/cartStore";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from "@fullcalendar/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/cartStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { generateDates } from "@/helpers/planner";
import { modal } from "@/stores/appStore";
import { formatDate } from "@/helpers/functions";
import { EventDropArg } from "@fullcalendar/core/index.js";
import ArticleRepository from "@/repositories/articleRepository";
import { IArticle, ICategory } from "@/core/interfaces";
import { Meta } from "@/core/types";
import CategoryRepository from "@/repositories/categoryRepository";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const { weeks, checkedDays, startDate } = useCartStore();
  const { dates, events } = useCartStore();
  const { lang } = useLangStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [articlesPrincipal, setArticlesPrincipal] = useState<{ data: IArticle[], meta: Meta }>({ data: [], meta});
  const articleRepository = useMemo(() => new ArticleRepository(setArticlesPrincipal), []);
  const [categories, setCategories] = useState<{ data: ICategory[], meta: Meta }>({ data: [], meta});
  const categoryRepository = useMemo(() => new CategoryRepository(setCategories), []);
  
  useEffect(() => {
    articleRepository.fetchArticles({take: 100,});
    categoryRepository.fetchCategories({take: 100});
  }, [articleRepository, categoryRepository]);

  const toggleDay = (day: string) => {
    const updatedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updatedDays);
  };

  useEffect(() => {
    setDates(generateDates(checkedDays, startDate, weeks * checkedDays.length))
    setItemCount(weeks * checkedDays.length);
  }, [checkedDays, weeks, startDate]);

  useEffect(() => {
    if(dates && dates.length > 0){
      setEvents(generatePlanning(dates, articlesPrincipal.data, categories.data));
    }
  }, [dates, articlesPrincipal.data, categories.data]);

  function handleCheckout(): void {
    if (!isAuthenticated) {
      router.push('/' + lang + '/login');
    } else {
      router.push('/' + lang + '/my/cart/checkout');
    }
  }


  const handleDateClick = (info: DateClickArg) => {
    if (events?.filter(event => event.date === info.dateStr)) {
      modal.open(
        <div>
          <h6 className="card-title mb-3">Commandes du {formatDate(info.dateStr.toString())}</h6>
          <ul className="list-group">
            { events?.filter(event => event.date === info.dateStr)?.map((event, index) => (
              <li key={index} className={`list-group-item d-flex justify-content-between text-bg-${theme}`}>
                <span>{event.title}</span>
                <i className="bi bi-trash ms-2" onClick={() => {removeEvent(event.id); handleDateClick(info);}}></i>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const handleDateDrop = (info: EventDropArg) => {
    if (!events) return;
    const arr = [...events];
    arr[info.event.extendedProps.index] = {
      ...arr[info.event.extendedProps.index],
      date: info.event.startStr,
    };
    setEvents(arr);
  }

  return (
    <div className="row">
      <div className="col-lg-8 mb-3 mb-lg-0">
        <div className={`card text-bg-${theme} p-3`}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events?.map((event, index) => ({
              title: event.title,
              date: event.date,
              slot: event.slot,
              extendedProps: { index }
            }))}
            eventColor="var(--bs-primary)"
            editable={true}
            selectable={true}
            droppable={true}
            dateClick={handleDateClick}
            eventDrop={handleDateDrop}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className={`card text-bg-${theme} sticky-lg-top`}>
          <div className="card-body">
            <h5 className="card-title mb-3">Paramètres</h5>
            <label htmlFor="start-date" className="form-label">Date de début :</label>
            <input 
              type="date" 
              id="start-date" 
              className="form-control mb-3" 
              value={new Date(startDate).toISOString().split('T')[0]} 
              onChange={e => setStartDate(new Date(e.target.value))} 
            />
            <label htmlFor="weeks-select" className="form-label">Nombre de semaines :</label>
            <select
              id="weeks-select"
              className="form-select mb-3"
              value={weeks}
              onChange={e => setWeeks(Number(e.target.value))}
            >
              {[1,2,3,4].map(w => (
                <option key={w} value={w}>
                  {w} semaine{w > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <label htmlFor="days-select" className="form-label">Jours de planification :</label>
            <div className="d-flex flex-wrap mb-3">
              {days.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  className={`btn btn-sm btn-${checkedDays.includes(day) ? "primary" : "secondary"}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div> 
            <p className="mb-3 fs-5 fw-normal">Livraison de 
              <span className="fw-bold text-primary ms-2">{(events?.length || 0)}</span> plats en 
              <span className="fw-bold text-primary ms-2">{dates?.length}</span> jours
            </p>
            <hr />
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Retour</button>
              <button type="button" className="btn btn-primary" onClick={handleCheckout}>Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
