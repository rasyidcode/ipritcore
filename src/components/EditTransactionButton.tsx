"use client";

import { useModalFormTransaction } from "@/components/ModalFormTransactionProvider";
import React from "react";

export default function EditTransactionButton({
  className,
}: {
  className: string;
}) {
  const { handleOpen } = useModalFormTransaction();

  return <div></div>;
}
