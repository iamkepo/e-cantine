export interface Article{  
  id: number;
  label: string;
  description?: string;
  img: string;
  tags: number[];
  type: number;
  category: number;
  date_updated?: number
}
export interface Option {
  label: string;
  action: ()=> void
}