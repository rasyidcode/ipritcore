import GroceryPlanItem from "@/components/GroceryPlanItem";
import ModalGroceryPlanningForm from "@/components/ModalGroceriesPlanningForm";
import NewGroceryPlanButton from "@/components/NewGroceryPlanButton";

export default async function GroceriesPlanPage() {
  const data = Array.from([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  return (
    <>
      <div className="flex flex-col overflow-hidden flex-1 gap-4">
        <NewGroceryPlanButton />
        <div className="flex-1 flex flex-col overflow-y-auto border border-white/[0.09] rounded">
          {data ? (
            <ul className="p-2 divide-y divide-white/[0.09]">
              {data.map((num, i) => (
                <GroceryPlanItem key={i} i={i} />
              ))}
            </ul>
          ) : (
            <p>Belum ada rencana belanja.</p>
          )}
        </div>
      </div>
      <ModalGroceryPlanningForm />
    </>
  );
}
