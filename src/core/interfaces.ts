export interface Params { 
  id?: string;
  skip?: number;
  take?: number;
  search?: string;
  typeId?: string;
  categoryId?: string;
 };
export interface ContextParams { params: Promise<Params> };


export interface ResponseData<T> {
  data: T;
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
