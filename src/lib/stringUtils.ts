export const numberToIDRFormat = (num: number): string => {
  return `Rp. ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const dateToReadableFormat = (date: Date): string => {
  return `${date.toLocaleDateString("id-ID", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};
