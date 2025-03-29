import { dateToReadableFormat } from "@/lib/stringUtils";

export default function TransactionGroupItem({ date }: { date: string }) {
  const newDate = new Date();
  newDate.setTime(Date.parse(date));

  return (
    <div className="p-2 bg-gray-100">
      <h3 className="text-gray-600 text-sm font-semibold">
        {dateToReadableFormat(newDate)}
      </h3>
    </div>
  );
}
