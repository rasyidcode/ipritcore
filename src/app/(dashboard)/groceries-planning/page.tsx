import ModalGroceryForm from "@/components/ModalGroceryForm";
import NewGroceryButton from "@/components/NewGroceryButton";

export default function GroceriesPlanPage() {
  const data = Array.from([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  return (
    <>
      <div className="flex flex-col overflow-hidden flex-1 gap-4">
        <NewGroceryButton />
        <div className="flex-1 flex flex-col overflow-y-auto border border-white/[0.09] rounded">
          {data ? (
            <ul className="p-2 divide-y divide-white/[0.09]">
              {data.map((num, i) => (
                <li key={i} className="flex items-center gap-2 p-2">
                  <span className="bg-white text-black w-6 flex items-center justify-center rounded-full">
                    {i + 1}
                  </span>
                  <p className="flex-1">Sabun Mandi</p>
                  <p className="text-green-500">Rp. 12.000</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Belum ada transaksi</p>
          )}
        </div>
        <div className="border border-white/[0.09] text-center py-2 rounded font-bold text-lg">
          Rp. 120,000
        </div>
      </div>
      <ModalGroceryForm />
    </>
  );
}
