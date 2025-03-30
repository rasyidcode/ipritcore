"use client";

import { useModalFormTransaction } from "@/app/(dashboard)/_components/ModalFormTransactionProvider";
import { PencilIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function EditTransactionButton({
  className,
}: {
  className: string;
}) {
  const { handleOpen } = useModalFormTransaction();

  return <div></div>;
}
