const idrFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatIdr(value: number | string): string {
  const numericValue = typeof value === "number" ? value : parseIdr(value);

  return idrFormatter.format(numericValue);
}

export function parseIdr(idrStr: string): number {
  const cleanedStr = idrStr.replace(/\D/g, "");
  return Number(cleanedStr) || 0;
}

export const dateToReadableFormat = (date: Date): string => {
  return `${date.toLocaleDateString("id-ID", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};
