import { categories, tags, types } from "../core/constants";
import { formatDistanceToNow } from "date-fns";

export const tagRender = (id: number) => {
  const tag = tags.find((tag) => tag.id === id);
  return tag ? tag.label : "Unknown";
};
export const categoryRender = (id: number) => {
  const category = categories.find((category) => category.id === id);
  return category ? category.label : "Unknown";
};
export const typeRender = (id: number) => {
  const type = types.find((type) => type.id === id);
  return type ? type.label : "Unknown";
};
export const formateDate = (timestamp?: number): string => {
  if (!timestamp) return "Unknown update time";
  return `Last updated ${formatDistanceToNow(new Date(timestamp), { addSuffix: true })}`;
};
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1) 
}
export const statusRender = (status: string) => {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'paid':
      return 'Payé';
    case 'delivered':
      return 'Livré';
    case 'cancelled':
      return 'Annulé';
    default:
      return 'Inconnu';
  }
};
export const statusColorRender = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'paid':
      return 'success';
    case 'delivered':
      return 'primary';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};
// Format a date into DD/MM/YYYY
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
};