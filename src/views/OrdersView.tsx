import React, { useEffect, useState } from "react";
import { useThemeStore } from "../stores/themeStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { getHistoryByDate, getHistoryCommand, removeCommand, useHistoryStore } from "../stores/historyStore";
import { articlesPrincipal } from "../core/constants";
import { formatDate, capitalize, statusColorRender, statusRender } from "../helpers/functions";
import { modal } from "../stores/appStore";
import { History } from "../core/types";

const OrdersView: React.FC = () => {
  const { theme } = useThemeStore();
  const { commands, history } = useHistoryStore();
  const [ listEvent, setListEvent ] = useState<History>([]);
  const [ selectedCommand, setSelectedCommand ] = useState<number>(0);

  const handleDateClick = (info: DateClickArg) => {
    if (getHistoryByDate(info.dateStr)) {
      modal.open(
        <div className="text-center">
          <h5 className="mb-3">Commandes du {formatDate(info.dateStr.toString())}</h5>
          <ul className="list-group">
            { getHistoryByDate(info.dateStr)?.map((event, index) => (
              <li key={index} className={`list-group-item d-flex justify-content-between text-bg-${theme}`}>
                <span>{event.slot} {articlesPrincipal.find(a => a.id === event.plat_id)?.label}</span>
                <span className={`badge text-bg-${statusColorRender(event.status)}`}>
                  {statusRender(event.status)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };
  const deleteCommand = (commandId: number) => {
    modal.open(
      <div className="text-center">
        <h5 className="mb-3">Supprimer la commande {commandId}</h5>
        <p>Êtes-vous sûr de vouloir supprimer la commande {commandId} ?</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary me-2" onClick={() => modal.close()}>Annuler</button>
          <button className="btn btn-danger" onClick={() => {removeCommand(commandId); modal.close();}}>Supprimer</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setListEvent(getHistoryCommand(selectedCommand) || []);
  }, [selectedCommand]);


  return (
    <div className={`card text-bg-${theme} mb-3 h-100`}>
      <div className="card-body h-100">
        <h4 className="card-title">Commandes</h4>
        <div className="row h-100">
          <div className="col-lg-4 h-100">
            <h6 className="card-title">Liste des commandes</h6>
            {commands ? (
              <div className="list-group h-100 overflow-auto">
                {commands.map(item => (
                  <div 
                    key={item.id} 
                    className={`list-group-item list-group-item-action text-bg-${item.id === selectedCommand ? 'primary' : theme}`} 
                  >
                    <div 
                      className="d-flex w-100 justify-content-between"
                      onClick={() => setSelectedCommand(item.id as number)}
                    >
                      <h5 className="mb-1">{capitalize(item.address)} {item.id}</h5>
                      <small>
                        {getHistoryCommand(item.id as number)?.length || 0} plats 
                        <span className={`badge text-bg-${statusColorRender(item.status)} ms-2`}>
                          {statusRender(item.status)}
                        </span>
                      </small>
                    </div>
                    <i className="bi bi-trash text-danger float-end" onClick={()=>deleteCommand(item.id as number)}></i>
                    <p className="mb-1">Total: {item.total.toFixed(2)} XOF</p>
                    <small>{formatDate(item.updatedAt.toString())}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p className="card-text">Vous n'avez pas créé de plan.</p>
            )}
          </div>
          <div className="col-lg-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={(listEvent?.length > 0 ? listEvent : history)?.map(event => ({
                title: articlesPrincipal.find(a => a.id === event.plat_id)?.label || 'Unknown',
                date: event.date,
                allDay: true,
              }))}
              eventColor="var(--bs-primary)"
              dateClick={handleDateClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
