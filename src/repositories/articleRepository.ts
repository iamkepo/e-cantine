import { IArticle, ICategory, IType } from "@/core/interfaces";
import ArticlesService from "@/services/articlesService";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { SetData } from "@/core/types";

class ArticleRepository extends ArticlesService {
  constructor(setArticle: SetData<IArticle>) {
    super(setArticle);
  }

  async changeStatusArticle(id: number, status: string) {
    return await this.patchArticle(id, { attr: "status", val: status });
  }

  // Table configuration
  tableHeadArticle = [
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Nom' },
    { key: 'typeId', label: 'Type' },
    { key: 'categoryId', label: 'Categorie' },
    { key: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterArticle = {
    take: 10,
    search: "",
    typeId: "",
    categoryId: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    order: "desc"
  }

  // Form methods
  formCreateArticle(categories: ICategory[], types: IType[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "price", type: "number", label: "Prix", required: true, colSize: "col-12" },
      { id: "image", type: "text", label: "Image", required: true, colSize: "col-12" },
      { id: "description", type: "textarea", label: "Description", required: true, colSize: "col-12" },
      { id: "categoryId", type: "select", label: "Categorie", required: true, colSize: "col-12",
        options: categories.map((category: ICategory) => ({
          label: category.name,
          value: category.id
        }))
      },
      { id: "typeId", type: "select", label: "Type", required: true, colSize: "col-12",
        options: types.map((type: IType) => ({
          label: type.name,
          value: type.id
        }))
      },
    ]
  }

  formUpdateArticle(article: IArticle, categories: ICategory[], types: IType[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: article.name },
      { id: "price", type: "number", label: "Prix", required: true, colSize: "col-12", value: article.price },
      { id: "image", type: "text", label: "Image", required: true, colSize: "col-12", value: article.image },
      { id: "description", type: "textarea", label: "Description", required: true, colSize: "col-12", value: article.description },
      { id: "categoryId", type: "select", label: "Categorie", required: true, colSize: "col-12",
        options: categories.map((category: ICategory) => ({
          label: category.name,
          value: category.id
        })),
        value: article.categoryId
      },
      { id: "typeId", type: "select", label: "Type", required: true, colSize: "col-12",
        options: types.map((type: IType) => ({
          label: type.name,
          value: type.id
        })),
        value: article.typeId
      },
    ]
  }

  formFilterArticle(types: IType[], categories: ICategory[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "typeId", type: "select", placeholder: "Type", colSize: "col-12 col-md-2",
        options: types.map((type: IType) => ({
          label: type.name,
          value: type.id
        }))
      },
      { id: "categoryId", type: "select", placeholder: "Categorie", colSize: "col-12 col-md-2",
        options: categories.map((category: ICategory) => ({
          label: category.name,
          value: category.id
        }))
      },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      },
    ]
  }

  // Validation schemas
  articleSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    price: yup.number().required('Prix est requis'),
    image: yup.string().required('Image est requise'),
    description: yup.string().required('Description est requise'),
    categoryId: yup.number().required('Categorie est requise'),
    typeId: yup.number().required('Type est requis'),
    status: yup.string().required('Status est requis'),
  })

  articleFilterSchema = yup.object({
    search: yup.string().optional(),
    typeId: yup.string().optional(),
    categoryId: yup.string().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteArticle = {
    title: "Supprimer l'article",
    description: "Voulez-vous vraiment supprimer cet article ?",
  }

  confirmDeleteArticles = {
    title: "Supprimer les articles",
    description: "Voulez-vous vraiment supprimer ces articles ?",
  }

  confirmChangeStatusArticle = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de cet article ?",
  }
}

export default ArticleRepository;