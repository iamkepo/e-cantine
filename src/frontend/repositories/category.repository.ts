import CategoriesService from "@/frontend/services/categories.service";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { ICategory } from "@/core/interfaces";

class CategoryRepository extends CategoriesService {
  constructor() {
    super();
  }

  async changeStatusCategory(id: number, status: string, onSuccess?: (data: ICategory) => void, onError?: (error: Error) => void) {
    await this.patchCategory(id, { attr: "status", val: status }, onSuccess, onError);
  }

  // Table configuration
  tableHeadCategory = [
    { key: 'name', label: 'Nom' },
    { key: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterCategory = {
    take: 10,
    search: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    sort:  "desc"
  }

  // Form methods
  formCreateCategory() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateCategory(category: ICategory) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: category.name },
    ]
  }

  formFilterCategory() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      },
    ]
  }

  // Validation schemas
  categorySchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    status: yup.string().required('Status est requis'),
  })

  categoryFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteCategory = {
    title: "Supprimer la catégorie",
    description: "Voulez-vous vraiment supprimer cette catégorie ?",
  }

  confirmDeleteCategories = {
    title: "Supprimer les catégories",
    description: "Voulez-vous vraiment supprimer ces catégories ?",
  }

  confirmChangeStatusCategory = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de cette catégorie ?",
  }
}

export default CategoryRepository;