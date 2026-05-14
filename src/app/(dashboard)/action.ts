"use server";

import { ActionResult } from "@/lib/action";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createTransactionActions } from "@/lib/transactionActions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const actions = createTransactionActions({
  getSessionUserId: getRequiredSessionUserId,
  transaction: prisma.transaction,
  category: prisma.category,
  revalidatePath,
});

export async function createTransactionAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  return actions.createTransactionAction(_prevState, formData);
}

export async function updateTransactionAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  return actions.updateTransactionAction(_prevState, formData);
}

export async function deleteByIdAction(id: number): Promise<ActionResult> {
  return actions.deleteByIdAction(id);
}

async function getRequiredSessionUserId(): Promise<number> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}
