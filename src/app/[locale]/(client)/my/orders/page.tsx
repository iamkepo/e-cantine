/* eslint-disable @next/next/no-img-element */
"use client";

import { useThemeStore } from "@/stores/themeStore";
import { getHistoryByDate, getHistoryCommand, removeCommand, useHistoryStore } from "@/stores/historyStore";
import { useEffect, useState } from "react";
import { capitalize, statusColorRender, statusRender } from "@/helpers/functions";
import { formatDate } from "@/helpers/functions";
import { modal } from "@/stores/appStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { History } from "@/core/types";
import ArticleHComponent from "@/components/ArticleHComponent";
import { IArticle } from "@/core/interfaces";
import ArticleRepository from "@/repositories/articleRepository";
import { Meta } from "@/core/types";
import { useMemo } from "react";
import useDataFetch from "@/hooks/useDataForm";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const { commands, history } = useHistoryStore();
  const [ listEvent, setListEvent ] = useState<History>([]);
  const [ selectedCommand, setSelectedCommand ] = useState<number>(0);
  const articles = useDataFetch<IArticle>(); 
  const articleRepository = useMemo(() => new ArticleRepository(articles.handleData), [articles.handleData]);

  useEffect(() => {
    articleRepository.fetchArticles({
      take: 100,
    });
  }, [articleRepository]);

  const handleDateClick = (info: DateClickArg) => {
    if (getHistoryByDate(info.dateStr)) {
      modal.open(
        <div className={`card text-bg-${theme}`}>
          <div className="card-body">
            <h6 className="card-title">Liste des plats</h6>
            {getHistoryByDate(info.dateStr) ? (
              <ul className="list-group">
                { getHistoryByDate(info.dateStr)?.map((event, idx) => (
                  <li key={idx} className={`list-group-item text-bg-${theme}`}>
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={(articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.find(a => a.id === event.plat_id)?.image}
                          alt={(articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.find(a => a.id === event.plat_id)?.name}
                          className="img-fluid rounded"
                          onClick={() => action(event.plat_id)}
                        />
                      </div>
                      <div className="col-10 d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-truncate">{(articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.find(a => a.id === event.plat_id)?.name}</span>
                        <button type="button" className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-arrow-clockwise"></i> Modifier
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="card-text">Aucun plat trouvé pour cette date.</p>
            )}
          </div>
        </div>, 'xl'
      );
    }
  };


  const action = (subId: number) => {
    modal.open(
      <ArticleHComponent
        article={(articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.find(a => a.id === subId) as IArticle}
        choose={true}
      />,
      "xl"
    );
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
              <p className="card-text">Vous n&apos;avez pas créé de plan.</p>
            )}
          </div>
          <div className="col-lg-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={(listEvent?.length > 0 ? listEvent : history)?.map(event => ({
                title: (articles.state.get?.data as {data: IArticle[], meta: Meta})?.data.find(a => a.id === event.plat_id)?.name || 'Unknown',
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

export default Page;
