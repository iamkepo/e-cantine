import React, { useEffect, useState } from "react";
import { useThemeStore } from "../stores/themeStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { getEventsByDate, useHistoryStore } from "../stores/historyStore";
import { PlanningEvent } from "../core/types";

const OrdersView: React.FC = () => {
  const { theme } = useThemeStore();
  const { history } = useHistoryStore();
  const [ date, setDate ] = useState<Date> (history?.[0]?.events[0]?.date ? new Date(history?.[0]?.events[0]?.date) : new Date());
  const [ listDate, setListDate ] = useState<PlanningEvent[] | null> ();

  const handleDateClick = (info: DateClickArg) => {
    console.log(info);
    console.log(info.dateStr);
    console.log(new Date(info.dateStr));
    console.log(info.jsEvent);
    console.log(info.view);
    setDate(new Date(info.dateStr));
  };
  useEffect(() => {
    setListDate(getEventsByDate(date.toISOString().split('T')[0]));
  }, [date]);

  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title">Commandes</h4>
        <div className="row">
          <div className="col-lg-8">
            <div className={`card text-bg-${theme} p-3`}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={listDate ? listDate.map((event: PlanningEvent) => ({
                title: event.title,
                date: event.date,
                slot: event.slot
              })) : []}
              eventColor="var(--bs-primary)"
              dateClick={handleDateClick}
            />
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
                  value={new Date(date).toISOString().split('T')[0]} 
                  onChange={e => setDate(new Date(e.target.value))} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
