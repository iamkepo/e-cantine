export interface Article{  
  id: number;
  label: string;
  description?: string;
  img: string;
  tags: number[];
  type: number;
  category: number;
  date_updated?: number;
  price: number;
}
export type Cart = Partial<Article> & { count: number }
export interface Option {
  label: string;
  action: ()=> void
}