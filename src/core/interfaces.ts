export interface Params { 
  id?: string;
  skip?: number;
  take?: number;
  search?: string;
  typeId?: string;
  categoryId?: string;
 };
export interface ContextParams { params: Promise<Params> };