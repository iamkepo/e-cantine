import { 
  StatusActivation, 
  StatusCommand, 
  StatusDelivery, 
  StatusTransaction, 
  Slot,
  NotificationType
} from "@/enums";

export interface IUser {
  id?: number;
  email: string;
  password: string;
  username: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotification {
  id?: number;
  message: string;
  seen: boolean;
  type: NotificationType;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export interface IPhone {
  id?: number;
  indicator: string;
  number: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export interface IAdmin {
  id?: number;
  firstname: string;
  lastname: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export interface IPromo {
  id?: number;
  code: string;
  discount: number;
  maxUsage: number;
  countUsage: number;
  startDate: Date;
  endDate?: Date;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMethod {
  id?: number;
  name: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRestaurant {
  id?: number;
  fullname: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export interface IDeliverer {
  id?: number;
  firstname: string;
  lastname: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export interface IClient {
  id?: number;
  firstname: string;
  lastname: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export interface ILocation {
  id?: number;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  zipCode: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  clientId: number;
}

export interface IType {
  id?: number;
  name: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  id?: number;
  name: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IArticle {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  typeId: number;
  categoryId: number;
}

export interface ITag {
  id?: number;
  name: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IConnection {
  id?: number;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  tagId: number;
  articleId: number;
}

export interface IPreference {
  id?: number;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  tagId: number;
  clientId: number;
}

export interface IAllergen {
  id?: number;
  name: string;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAllergy {
  id?: number;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  allergenId: number;
  clientId: number;
}

export interface IUnconnection {
  id?: number;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  allergenId: number;
  articleId: number;
}

export interface ISubscription {
  id?: number;
  startDate: Date;
  endDate?: Date;
  transactionId: number;
  clientId: number;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransaction {
  id?: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: StatusTransaction;
  createdAt?: Date;
  updatedAt?: Date;
  promoId?: number;
  subscriptionId: number;
  methodId: number;
}



export interface IDate {
  id?: number;
  deliveryDate: Date;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  subscriptionId: number;
  locationId: number
}

export interface IEvent {
  id?: number;
  count: number;
  slot: Slot;
  status: StatusActivation;
  createdAt?: Date;
  updatedAt?: Date;
  articleId: number;
  dateId: number;
}

export interface ICommand {
  id?: number;
  status: StatusCommand;
  createdAt?: Date;
  updatedAt?: Date;
  eventId: number;
  restaurantId?: number;
}

export interface IDelivery {
  id?: number;
  status: StatusDelivery;
  createdAt?: Date;
  updatedAt?: Date;
  commandId: number;
  delivererId?: number;
}

export interface IStatistic {
  label: string;
  value: number;
}
export interface IAuth {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}