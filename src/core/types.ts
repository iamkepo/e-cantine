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

export interface PlanningEvent { id: number; title: string; date: string; slot: string };
export type History = {
  events: PlanningEvent[],
  users: string[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  promoCode: string;
  address: string;
  id: number;
}