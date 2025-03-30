import { dateToReadableFormat } from "@/lib/stringUtils";

export default function TransactionGroupItem({ date }: { date: string }) {
  const newDate = new Date();
  newDate.setTime(Date.parse(date));

  return (
    <div className="p-2 bg-[#f2f2f2] dark:bg-white/5">
      <h3 className="text-foreground text-sm font-semibold">
        {dateToReadableFormat(newDate)}
      </h3>
    </div>
  );
}
