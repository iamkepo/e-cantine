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