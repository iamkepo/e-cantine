import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IClient, IPreference, ITag } from "@/core/interfaces";
import PreferencesService from "@/services/preferencesService";
import { RequestState, RequestType, SetData } from "@/core/types";

export default class PreferencesRepository extends PreferencesService {
  constructor(preferences: {state: Record<RequestType, RequestState<IPreference>>, handleData: SetData<IPreference>}) {
    super(preferences.handleData);
  }

  // Table configuration
  tableHeadPreference = [
    { id: 'clientId', label: 'Client' },
    { id: 'tagId', label: 'Tag' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterPreference = {
    take: 10,
    clientId: "",
    tagId: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    order: "desc"
  }

  // Form methods
  formCreatePreference(tags: ITag[], clients: IClient[]) {
    return [
      { 
        id: "clientId", 
        type: "select", 
        label: "Client", 
        required: true, 
        colSize: "col-12",
        options: clients.map((client: IClient) => ({
          label: client.name,
          value: client.id
        }))
      },
      { 
        id: "tagId", 
        type: "select", 
        label: "Tag", 
        required: true, 
        colSize: "col-12",
        options: tags.map((tag: ITag) => ({
          label: tag.name,
          value: tag.id
        }))
      }
    ]
  }

  formUpdatePreference(preference: IPreference, tags: ITag[], clients: IClient[]) {
    return [
      { 
        id: "clientId", 
        type: "select", 
        label: "Client", 
        required: true, 
        colSize: "col-12",
        options: clients.map((client: IClient) => ({
          label: client.name,
          value: client.id
        })),
        value: preference.clientId
      },
      { 
        id: "tagId", 
        type: "select", 
        label: "Tag", 
        required: true, 
        colSize: "col-12",
        options: tags.map((tag: ITag) => ({
          label: tag.name,
          value: tag.id
        })),
        value: preference.tagId
      },
      { 
        id: "status", 
        type: "select", 
        label: "Status", 
        required: true, 
        colSize: "col-12",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        })),
        value: preference.status
      }
    ]
  }

  formFilterPreference(tags: ITag[], clients: IClient[]) {
    return [
      { 
        id: "clientId", 
        type: "select", 
        placeholder: "Client", 
        colSize: "col-12 col-md-4",
        options: clients.map((client: IClient) => ({
          label: client.name,
          value: client.id
        }))
      },
      { 
        id: "tagId", 
        type: "select", 
        placeholder: "Tag", 
        colSize: "col-12 col-md-4",
        options: tags.map((tag: ITag) => ({
          label: tag.name,
          value: tag.id
        }))
      },
      { 
        id: "status", 
        type: "select", 
        placeholder: "Status", 
        colSize: "col-12 col-md-4",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      }
    ]
  }

  // Validation schemas
  preferenceSchema = yup.object({
    id: yup.number().optional(),
    clientId: yup.number().required('Client est requis'),
    tagId: yup.number().required('Tag est requis'),
    status: yup.string().required('Status est requis')
  })

  preferenceFilterSchema = yup.object({
    clientId: yup.number().optional(),
    tagId: yup.number().optional(),
    status: yup.string().optional()
  })

  // Confirmation dialogs
  confirmDeletePreference = {
    title: "Supprimer la préférence",
    description: "Voulez-vous vraiment supprimer cette préférence ?"
  }

  confirmDeletePreferences = {
    title: "Supprimer les préférences",
    description: "Voulez-vous vraiment supprimer ces préférences ?"
  }

  confirmChangeStatusPreference = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de cette préférence ?"
  }
}