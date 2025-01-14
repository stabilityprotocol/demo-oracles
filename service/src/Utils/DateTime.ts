export const normalizeDate = (date: Date = new Date()) => {
  return date.toISOString().split("T")[0];
};
export const normalizeTime = (date: Date = new Date()) => {
  return date.toISOString().split("T")[1].split(".")[0];
};
