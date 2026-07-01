// Formats a date/ISO string as "YYYY-MM-DD HH:mm" in local time.
export const formatDateTime = (input: string | Date): string => {
  const d = new Date(input);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
};
