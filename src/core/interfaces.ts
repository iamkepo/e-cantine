export interface Params { 
  id?: string;
 };
export interface ContextParams { params: Promise<Params> };

export interface ParamsQuery { 
  take?: number;
  search?: string;
  typeId?: number;
  categoryId?: number;
  tagId?: number;
  page?: number;
  status?: string;
  articleId?: number;
 };
export interface ResponseData<T> {
  data: T;
}
export interface Meta {
  total: number;
  page: number;
  pageCount: number;
  limit: number;
}

export interface IUser {
  id?: number;
  name: string;
  password: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IType {
  id?: number;
  name: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  id?: number;
  name: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITag {
  id?: number;
  name: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IArticle {
  id?: number;
  name: string;
  image: string;
  price: number;
  description: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: number;
  typeId: number;
}

export interface IArticleTag {
  id?: number;
  articleId: number;
  tagId: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
