import { categories, tags, types } from "../core/constants";

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

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1) 
}
export const statusRender = (status: string) => {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'paid':
      return 'Payé';
    case 'delivered':
      return 'Livré';
    case 'cancelled':
      return 'Annulé';
    default:
      return status;
  }
};
export const statusColorRender = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'active':
      return 'success';
    case 'inactive':
      return 'danger';
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
export function generateRandomString(minLength: number, maxLength: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}