import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function timeAgo(input: number | Date) {
  type ObjectType = {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges: ObjectType = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };

  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (let key in ranges) {
    if (ranges[key as keyof ObjectType] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key as keyof ObjectType];
      return formatter.format(Math.round(delta), key as keyof ObjectType);
    }
  }
}

export function formatDate(date: Date | undefined) {
  if (!date) {
    throw new Error("Date is undefined");
  }

  const now = new Date();
  const msBetweenDates = Math.abs(date.getTime() - now.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  if (hoursBetweenDates < 24) {
    return timeAgo(date);
  }

  const dateLong = date.toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return dateLong;
}
