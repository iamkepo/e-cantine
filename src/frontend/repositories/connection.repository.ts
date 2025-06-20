import ConnectionsService from "@/frontend/services/connections.service";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IArticle, IConnection, ITag } from "@/core/interfaces";

class ConnectionRepository extends ConnectionsService {
  constructor() {
    super();
  }

  formCreateConnection(articles?: IArticle[], tags?: ITag[]) {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: articles?.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: tags?.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
    ]
  }

  formUpdateConnection(connection: IConnection, articles?: IArticle[], tags?: ITag[]) {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: articles?.map((article: IArticle) => ({ label: article.name, value: article.id })), value: connection.articleId },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: tags?.map((tag: ITag) => ({ label: tag.name, value: tag.id })), value: connection.tagId },
    ]
  }

  formFilterConnection(articles?: IArticle[], tags?: ITag[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "tagId", type: "select", placeholder: "Tag", colSize: "col-12 col-md-2", options: tags?.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
      { id: "articleId", type: "select", placeholder: "Article", colSize: "col-12 col-md-2", options: articles?.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }
  tableHeadConnection = [
    {label: 'Type', key: 'typeId'},
    {label: 'Article', key: 'articleId'},
    {label: 'Status', key: 'status'}
  ]

  filterConnection = { take: 10, search: "", status: "", articleId: 0, tagId: 0, page: 1, orderBy: "createdAt", sort:  "desc" }


  confirmDeleteConnection = {
    title: "Supprimer la connection", 
    description: "Voulez-vous vraiment supprimer la connection ?",
  }

  confirmDeleteConnections = {
    title: "Supprimer les connections", 
    description: "Voulez-vous vraiment supprimer les connections ?",
  }

  confirmChangeStatusConnection = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la connection ?",
  }

  connectionSchema = yup.object({
    id: yup.number().optional(),
    articleId: yup.number().required('Article est requis'),
    tagId: yup.number().required('Tag est requis'),
  })

  connectionFilterSchema = yup.object({
    search: yup.string().optional(),
    tagId: yup.string().optional(),
    articleId: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default ConnectionRepository;