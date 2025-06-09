import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IType } from "@/core/interfaces";
import TypesService from "@/services/typesService";
import { RequestState, RequestType, SetData } from "@/core/types";

class TypeRepository extends TypesService {
  constructor(types: {state: Record<RequestType, RequestState<IType>>, handleData: SetData<IType>}) {
    super(types.handleData);
  }

  async changeStatusType(id: number, status: string) {
    return await this.patchType(id, { attr: "status", val: status });
  }

  formCreateType() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateType(type: IType) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: type.name },
    ]
  }

  formFilterType() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadType = [
    {label: 'Nom', key: 'name'},
    {label: 'Status', key: 'status'}
  ]

  filterType = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteType = {
    title: "Supprimer le type", 
    description: "Voulez-vous vraiment supprimer le type ?",
  }

  confirmDeleteTypes = {
    title: "Supprimer les types", 
    description: "Voulez-vous vraiment supprimer les types ?",
  }

  confirmChangeStatusType = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce type ?",
  }

  typeSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    status: yup.string().optional(),
  })

  typeFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default TypeRepository;