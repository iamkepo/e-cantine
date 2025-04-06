import { DateObject } from "react-multi-date-picker";
import { categories, days, tags, types } from "./constants";
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
export const generateDates = (selectedDays: string[], limit: number): DateObject[] => {
  const dateList: DateObject[] = [];
  const currentDate = new Date();

  // Loop through days until 30 dates are added
  while (selectedDays.length > 0 && dateList.length < limit) {
    const dayName = days[currentDate.getDay()];
    if (selectedDays.includes(dayName)) {
      dateList.push(new DateObject(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
};


// Format a date into DD/MM/YYYY
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
};