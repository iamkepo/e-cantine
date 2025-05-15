export interface User {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  create_date?: Date;
  update_date?: Date;
};
export interface Phone {
  _id?: string;
  indicatif: string;
  number: string;
  create_date?: Date;
  update_date?: Date;
  user_id: string;
};
export interface Admin {
  _id?: string;
  name: string;
  pic?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  phone_id?: string;
  user_id: string;
};
export interface Client {
  _id?: string;
  name: string;
  pic: string;
  bio?: string;
  reference_code?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  phone_id: string;
  user_id: string;
};
export interface Restaurant {
  _id?: string;
  name: string;
  pic: string;
  bio?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  phone_id: string;
  user_id: string;
  location_id: string;
};
export interface Livreur {
  _id?: string;
  name: string;
  pic?: string;
  bio?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  phone_id: string;
  user_id: string;
};
export interface Location {
  _id?: string;
  name: string;
  latitude?: string;
  longitude?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  user_id: string;
};
export interface Coupon {
  _id?: string;
  name?: string;
  code: string;
  value: number;
  devise: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  exp_date: Date;
  reference_code?: string;
  client_id: string;
};
export interface Article {
  _id?: string;
  pic: string;
  name: string;
  value?: number;
  devise?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  vendeur_id: string;
};
export interface Commande {
  _id?: string;
  value?: number;
  devise?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  client_id: string;
  location_id: string;
  vendeur_id: string;
};
export interface CommandeLine {
  _id?: string;
  note?: string;
  create_date?: Date;
  update_date?: Date;
  commande_id: string;
  article_id: string;
};
export interface Course {
  _id?: string;
  status?: string;
  create_date?: Date;
  update_date?: Date;
  commande_id: string;
  livreur_id: string;
}