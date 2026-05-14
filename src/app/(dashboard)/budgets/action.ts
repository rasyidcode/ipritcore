"use server";

import { ActionResult } from "@/lib/action";
import { authOptions } from "@/lib/auth";
import { createBudgetActions } from "@/lib/budgetActions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const actions = createBudgetActions({
  getSessionUserId: getRequiredSessionUserId,
  budget: prisma.budget,
  category: prisma.category,
  revalidatePath,
});

export async function upsertBudgetAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  return actions.upsertBudgetAction(_prevState, formData);
}

async function getRequiredSessionUserId(): Promise<number> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}
