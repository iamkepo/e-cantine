/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Article{  
  id: number;
  label: string;
  description?: string;
  img: string;
  tags: number[];
  category?: number;
  date_updated?: number;
  price: number;
}
export interface CItem {
  id: number;
  count: number;
}
export type Cart = CItem & { 
  accompanement: CItem[];
  boisson: CItem[];
}
export interface Option {
  label: string;
  action: ()=> void
}
export type CommandStatus = "pending" | "paid" | "shipped" | "cancelled";
export type HistoryStatus = "pending" | "shipped" | "delivered";
export interface PlanningEvent { id: number; title: string; date: string; slot: string };

export interface Command {
  id?: number;
  weeks: number;
  checkedDays: string[];
  startDate: Date;
  persons: string[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  promoCode?: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  status: CommandStatus;
  cart: Cart[];
}
export type History = {
  id: number; 
  plat_id: number; 
  date: string; 
  slot: string
  command_id: number;
  status: HistoryStatus;
}[]


export interface Params { 
  id?: string;
 };
export interface ContextParams { params: Promise<Params> };

export interface ParamsQuery { 
  take?: number;
  page?: number;
  status?: string;
  orderBy?: string;
  sort?: string;
  search?: string;
 };
export interface JoinLien { key: string, value: number[] };
export interface ResponseData<T> {
  data: T;
}
export interface Meta {
  total: number;
  page: number;
  pageCount: number;
  limit: number;
}
export interface MetaResponse<T> {
  data: T[];
  meta: Meta;
}

export interface RepositoryResponse<T> {
  data: T[];
  meta: Meta;
}

export type RepositorySetData<T> = (response: RepositoryResponse<T>) => void;

export interface RepositoryState<T> {
  data: T[];
  meta: Meta;
  loading: boolean;
  error: any;
}

export type RequestType = "get" | "getById" | "post" | "put" | "patch" | "delete" | "deleteMany";

export type RequestState<T> = {
  data: T | T[] | { data: T[], meta: Meta } | boolean | string | null;
  loading: boolean;
  error: string | null;
};
export type SetData<T> = (
  rep: RequestType,
  key: keyof RequestState<T>,
  data: T | T[] | { data: T[], meta: Meta } | boolean | string | null
) => void;

export interface Field {
  type: 'section' | 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'file' | 'date' | 'checkbox' | 'select' | 'searchSelect' | 'radio' | 'password' | 'button' | 'submit' | 'reset' | 'range' | 'time' | 'datetime-local' | 'month' | 'week' | 'search' | 'datetime' | 'hidden';
  id: string;
  label?: string;
  placeholder?: string;  
  colSize: string;
  color?: string;
  options?: { label: string; value: string }[];  
  isChecked?: boolean;  
  multiple?: boolean;  
  readOnly?: boolean;  
  value?: any;
  accept?: string;
  min?: number;
  max?: number;
  step?: number;
};