export function getMonthStart(monthParam?: string, fallbackDate = new Date()) {
  const fallbackMonth = new Date(
    fallbackDate.getFullYear(),
    fallbackDate.getMonth(),
    1,
  );

  if (!monthParam) {
    return fallbackMonth;
  }

  const match = monthParam.match(/^(\d{4})-(\d{2})$/);

  if (!match) {
    return fallbackMonth;
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;

  if (monthIndex < 0 || monthIndex > 11) {
    return fallbackMonth;
  }

  return new Date(year, monthIndex, 1);
}

export function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function toMonthParam(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function formatMonthLabel(date: Date) {
  return date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}
