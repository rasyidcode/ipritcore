export const numberToIDRFormat = (num: number): string => {
  return `Rp. ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const dateToReadableFormat = (date: Date): string => {
  return `${date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })}`;
};
