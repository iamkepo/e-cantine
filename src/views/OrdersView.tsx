import React, { useState } from "react";
import { useThemeStore } from "../stores/themeStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { getEventsByDate } from "../stores/historyStore";
import { PlanningEvent } from "../core/types";

const OrdersView: React.FC = () => {
  const { theme } = useThemeStore();
  const [ date, setDate ] = useState<Date> (new Date());

  const handleDateClick = (info: DateClickArg) => {
    console.log(info);
    console.log(info.dateStr);
    console.log(new Date(info.dateStr));
    console.log(info.jsEvent);
    console.log(info.view);
    setDate(new Date(info.dateStr));
  };

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
              events={getEventsByDate(date.toISOString().split('T')[0])?.map((event: PlanningEvent, index: number) => ({
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
            />
            </div>
          </div>
          <div className="col-lg-4">
            <div className={`card text-bg-${theme} sticky-lg-top`}>
              <div className="card-body">
                <h5 className="card-title mb-3">Paramètres</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
