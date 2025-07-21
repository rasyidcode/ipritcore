import GroceryItem from "@/components/GroceryItem";
import ModalGroceryForm from "@/components/ModalGroceryForm";
import NewGroceryButton from "@/components/NewGroceryButton";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function GroceryPlanItemPage() {
  const data = Array.from([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  const session = await getServerSession(authOptions);
  // return today's groceries
  const groceries = await prisma.grocery.findMany({
    where: {
      userId: session?.user.id,
      createdAt: new Date().toISOString().split("T")[0], // only today's groceries
    },
  });
  console.log(groceries);
  return (
    <>
      <div className="flex flex-col overflow-hidden flex-1 gap-4">
        <NewGroceryButton />
        <div className="flex-1 flex flex-col overflow-y-auto border border-white/[0.09] rounded">
          {data ? (
            <ul className="p-2 divide-y divide-white/[0.09]">
              {data.map((num, i) => (
                <GroceryItem i={i} />
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
