"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

export default function TestPage() {
  const [selectedDate, setSeletedDate] = useState<Date | null>(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSeletedDate(date)}
    />
  );
}
