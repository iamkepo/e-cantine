import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { ITag } from "@/core/interfaces";
import TagsService from "@/services/tagsService";
import { RequestState, RequestType, SetData } from "@/core/types";

class TagRepository extends TagsService {
  constructor(tags: {state: Record<RequestType, RequestState<ITag>>, handleData: SetData<ITag>}) {
    super(tags.handleData);
  }

  async changeStatusTag(id: number, status: string) {
    return await this.patchTag(id, { attr: "status", val: status });
  }

  formCreateTag() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateTag(tag: ITag) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: tag.name },
    ]
  }

  formFilterTag() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadTag = [
    {label: 'Nom', key: 'name'},
    {label: 'Status', key: 'status'}
  ]

  filterTag = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteTag = {
    title: "Supprimer le tag", 
    description: "Voulez-vous vraiment supprimer le tag ?",
  }

  confirmDeleteTags = {
    title: "Supprimer les tags", 
    description: "Voulez-vous vraiment supprimer les tags ?",
  }

  confirmChangeStatusTag = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status du tag ?",
  }

  tagSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    status: yup.string().optional(),
  })

  tagFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default TagRepository;