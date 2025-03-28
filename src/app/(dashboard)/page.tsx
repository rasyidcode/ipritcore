import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

type Expense = {
  name: string;
  amount: number;
  type: "income" | "expense";
  createdAt: string;
};

const data: Expense[] = [
  {
    name: "Beli sayur",
    amount: 54000,
    type: "expense",
    createdAt: "2025-03-30 12:30:00",
  },
  {
    name: "Beli sayur",
    amount: 54000,
    type: "expense",
    createdAt: "2025-03-29 12:30:00",
  },
  {
    name: "Beli sayur",
    amount: 54000,
    type: "expense",
    createdAt: "2025-03-28 12:30:00",
  },
  {
    name: "Beli sayur",
    amount: 54000,
    type: "expense",
    createdAt: "2025-03-27 12:30:00",
  },
  {
    name: "Suami bayar utang",
    amount: 15000,
    type: "income",
    createdAt: "2025-03-26 12:37:00",
  },
  {
    name: "Beli terasi",
    amount: 5000,
    type: "expense",
    createdAt: "2025-03-26 11:00:00",
  },
  {
    name: "Bakso dipasar",
    amount: 25000,
    type: "expense",
    createdAt: "2025-03-26 09:00:00",
  },
  {
    name: "Sunlight sabun cuci piring",
    amount: 18000,
    type: "expense",
    createdAt: "2025-03-26 06:30:00",
  },
  {
    name: "Beli bahan-bahan dapur",
    amount: 14000,
    type: "expense",
    createdAt: "2025-03-25 14:30:00",
  },
  {
    name: "Beli sayur",
    amount: 54000,
    type: "expense",
    createdAt: "2025-03-25 12:30:00",
  },
  {
    name: "Saldo awal",
    amount: 754000,
    type: "income",
    createdAt: "2025-03-25 02:11:00",
  },
];

export default function DashboardPage() {
  const balance = data.reverse().reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc + curr.amount;
    }

    return acc - curr.amount;
  }, 0);
  const totalExpenses = data.reduce(
    (acc, curr) => (curr.type === "expense" ? acc - curr.amount : acc),
    0
  );
  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold">Dasbor</h1>
      <div className="flex gap-2 mt-4">
        <div className="border flex-1 p-2">
          <p className="text-sm uppercase tracking-wider font-semibold">
            Saldo
          </p>
          <h3 className="text-lg font-medium text-green-600">
            {formatRupiah(balance.toString(), "Rp. ")}
          </h3>
        </div>
        <div className="border flex-1 p-2">
          <p className="text-sm uppercase tracking-wider font-semibold">
            Pengeluaran
          </p>
          <h3 className="text-lg font-medium text-red-600">
            {formatRupiah(totalExpenses.toString(), "Rp. ")}
          </h3>
        </div>
      </div>
      <div className="flex-1 flex flex-col mt-4 overflow-hidden">
        <h2 className="text-lg font-semibold">Transaksi Terakhir</h2>
        <div className="flex-1 divide-y border mt-2 overflow-y-auto">
          {data.map((expense) => (
            <div key={expense.createdAt} className="p-2">
              <div className="flex items-center">
                <h4 className="flex-1">{expense.name}</h4>
                <button
                  className="rounded-full border h-6 w-6
                flex items-center justify-center hover:bg-[#f2f2f2]
                hover:border-transparent"
                >
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-end">
                <p
                  className={`flex-1 ${
                    expense.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-semibold`}
                >
                  {formatRupiah(expense.amount.toString(), "Rp. ")}
                </p>
                <p className="text-sm text-gray-700 font-light">
                  {expense.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatRupiah(number: string, prefix: string = ""): string {
  let numberStr = number.replace(/[^,\d]/g, "").toString(),
    split = numberStr.split(","),
    left = split[0].length % 3,
    rupiah = split[0].substring(0, left),
    thousands = split[0].substring(left).match(/\d{3}/gi);

  if (thousands) {
    let separator = left ? "." : "";
    rupiah += separator + thousands.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}
