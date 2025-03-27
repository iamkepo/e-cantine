import { categories, tags, types } from "./constants";
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