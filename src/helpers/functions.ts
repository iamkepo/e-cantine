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

// Format a date into DD/MM/YYYY
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
};