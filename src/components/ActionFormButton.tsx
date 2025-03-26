"use client";

export default function ActionFormButton({
  text,
  pendingText,
}: {
  text: string;
  pendingText: string;
}) {
  const pending = true;
  return (
    <button
      className="
                text-sm px-4 py-1
                uppercase 
                font-bold 
                text-teal-500
                border
                border-teal-500
                hover:bg-teal-100/60 flex justify-center items-center gap-2"
      aria-disabled={pending}
      disabled={pending}
    >
      {!pending ? "save" : <div className="animate-spin">spinner</div>}{" "}
      {!pending ? text : pendingText}
    </button>
  );
}
