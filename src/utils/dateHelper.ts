import moment from "moment";

export const formatDate = (timestamp: string | number, format="DD MMM YYYY, HH:MM A") => {
  return moment(timestamp).format(format);
}

export function getAllDaysInMonth(year: number, month: number): string[] {
  const date = new Date(year, month, 1);

  const dates: string[] = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date).toISOString().split("T")[0]);
    date.setDate(date.getDate() + 1);
  }

  return dates;
}