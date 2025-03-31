import { dateToReadableFormat } from "@/lib/stringUtils";

export default function TransactionGroupItem({ date }: { date: Date }) {
  return (
    <div className="p-2 bg-[#f2f2f2] dark:bg-white/5 w-full">
      <h3 className="text-foreground text-sm font-semibold">
        {dateToReadableFormat(date)}
      </h3>
    </div>
  );
}
