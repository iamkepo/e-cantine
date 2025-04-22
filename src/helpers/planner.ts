import { days } from "../core/constants";

export const generateDates = (selectedDays: string[], startDate: Date, limit: number): Date[] => {
  const dateList: Date[] = [];
  const currentDate = new Date(startDate);

  // Loop through days until 30 dates are added
  while (selectedDays.length > 0 && dateList.length < limit) {
    const dayName = days[currentDate.getDay()];
    if (selectedDays.includes(dayName)) {
      dateList.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
};

