import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventDropArg } from '@fullcalendar/core';

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { days } from "../core/constants";
import { generateDates } from "../helpers/planner";
import { formatDate } from "../helpers/functions";
import { useThemeStore } from "../stores/themeStore";
import { useLangStore } from "../stores/langStore";
import { useAuthStore } from "../stores/useAuthStore";
import { generatePlanning, removeEvent, setCheckedDays, setDates, setEvents, setItemCount, setStartDate, setWeeks, useCartStore } from "../stores/cartStore";

const PlannerView = () => {
  const { theme } = useThemeStore();
  const { weeks, checkedDays, startDate } = useCartStore();
  const { dates, events } = useCartStore();
  const navigate = useNavigate();
  const { lang } = useLangStore();
  const { isAuthenticated } = useAuthStore();
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

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
      setEvents(generatePlanning(dates));
    }
  }, [dates]);

  function handleCheckout(): void {
    if (!isAuthenticated) {
      navigate('/' + lang + '/login', { state: { from: '/client/planning' } });
    } else {
      navigate('/' + lang + '/client/cart/checkout');
    }
  }

  const handleDateClick = (info: DateClickArg) => {
    console.log(info);
    info.dayEl.style.backgroundColor = 'var(--bs-primary)';
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
      <div className="col-lg-8">
          <div className={`card text-bg-${theme} p-3`}>
            <p className="text-end" onClick={() => setView(view === 'calendar' ? 'list' : 'calendar')}>
              <span className="d-inline-block">{view === 'calendar' ? 'Voir la liste' : 'Voir le calendrier'}</span>
              <i className={`bi bi-${view === 'calendar' ? 'list' : 'grid'} ms-2`}></i>
            </p>
            {view === 'calendar' ? (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events?.map((event, index) => ({
                  ...event,
                  extendedProps: { index }
                }))}
                eventColor="var(--bs-primary)"
                editable={true}
                selectable={true}
                droppable={true}
                dateClick={handleDateClick}
                eventDrop={handleDateDrop}
              />
            ) : (
              events?.map((event, index) => (
                <div key={index} className="d-flex justify-content-between mb-3">
                  <span>{formatDate(event.date)}</span>
                  <span>{event.title}</span>
                  <i className="bi bi-trash ms-2" onClick={() => removeEvent(index)}></i>
                </div>
              ))
            )}
          </div>
        </div>
      <div className="col-lg-4">
        <div className={`card text-bg-${theme} sticky-lg-top`}>
          <div className="card-body">
            <h5 className="card-title mb-3">Paramètres</h5>
            <label htmlFor="start-date" className="form-label mb-3">Date de début :</label>
            <input 
              type="date" 
              id="start-date" 
              className="form-control" 
              value={new Date(startDate).toISOString().split('T')[0]} 
              onChange={e => setStartDate(new Date(e.target.value))} 
            />
            
            <label htmlFor="weeks-select" className="form-label mb-3">Durée de planification :</label>
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
            <label htmlFor="days-select" className="form-label mb-3">Jours de planification :</label>
            <div className="d-flex justify-content-between mb-3">
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
            <p className="mb-3">{dates?.length} dates</p> 
            <p className="mb-3">{events?.length} plats</p>
            <hr />
            <div className="d-flex justify-content-between">
              <Link className="btn btn-secondary" to={'/'+lang+'/client/cart'}>Retour</Link>
              <button className="btn btn-primary" onClick={handleCheckout}>Valider</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerView;
