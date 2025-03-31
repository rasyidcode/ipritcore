export const numberToIDRFormat = (num: number): string => {
  return `Rp. ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export function formatIdr(numStr: string): string {
  // Remove non-numeric characters excepts dots (for decimals)
  const number = numStr.replace(/[^0-9,]/g, "");

  // Convert sanitized string to a number
  const numericValue = Number(number.replace(/,/g, "")) || 0;

  // Format as Indonesian Rupiah (IDR)
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Change to 2 if you want decimals
  }).format(numericValue);
}

export function parseIdr(idrStr: string): number {
  // Remove currency symbol, non-numeric characters, and spaces
  const cleanedStr = idrStr.replace(/[^\d,]/g, "").replace(/,/g, "");

  // Convert to number
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
