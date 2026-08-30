import dayjs from "dayjs";

export const DATE_FORMATS = [
  { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
  { label: "MMM D, YYYY", value: "MMM D, YYYY" },
];

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_TIME_FORMAT = "HH:mm:ss";
export const DEFAULT_TIME_UTC_FORMAT = "h:mm a";
export const CURRENT_YEAR = dayjs().format("YYYY");