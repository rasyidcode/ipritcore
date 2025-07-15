import TransactionList from "../_components/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="flex-1 p-4 flex flex-col overflow-hidden md:max-h-[768px]">
      <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
      <div className="flex-1 flex flex-col mt-4 overflow-hidden">
        <TransactionList transactions={[]} />
      </div>
    </div>
  );
}
