"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function TransactionDateButton() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleClick = () => {
    
  }

  return (
    <button
      onClick={handleClick}
      className="h-8 bg-foreground rounded-lg border border-solid px-4
        text-sm flex items-center justify-center hover:bg-[#383838]
        transition-colors duration-150 ease-linear gap-2 mt-2 text-background
        dark:hover:bg-[#ccc]"
    >
      <CalendarDaysIcon className="w-5 h-5" />
      {month} - {year}
    </button>
  );
}
