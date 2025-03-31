"use server";

import {
  ActionFormValidationError,
  ActionResult,
  getActionError,
} from "@/lib/action";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseIdr } from "@/lib/stringUtils";
import { TransactionType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function deleteByIdAction(id: number) {
  await prisma.transaction.delete({ where: { id: id } });
  revalidatePath("/");
}

const schema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1),
  type: z
    .string()
    .min(1)
    .transform((val) => {
      if (val == "expense") {
        return TransactionType.EXPENSE;
      }
      return TransactionType.INCOME;
    }),
  amount: z
    .string()
    .min(1)
    .transform((val) => parseIdr(val)),
  date: z
    .string()
    .min(1)
    .transform((val) => new Date(val)),
});

export async function createTransactionAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const validatedFields = schema.safeParse({
      name: formData.get("name"),
      type: formData.get("type"),
      date: formData.get("date"),
      amount: formData.get("amount"),
    });

    if (!validatedFields.success) {
      throw new ActionFormValidationError(
        "Validasi gagal!",
        validatedFields.error.flatten().fieldErrors
      );
    }

    const session = await getServerSession(authOptions);

    await prisma.transaction.create({
      data: {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        date: validatedFields.data.date,
        amount: validatedFields.data.amount,
        userId: session?.user.id as number,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Berhasil membuat transaksi.",
    };
  } catch (error) {
    return getActionError(error);
  }
}

export async function updateTransactionAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const validatedFields = schema.safeParse({
      id: formData.get("id"),
      name: formData.get("name"),
      type: formData.get("type"),
      date: formData.get("date"),
      amount: formData.get("amount"),
    });

    if (!validatedFields.success) {
      throw new ActionFormValidationError(
        "Validasi gagal!",
        validatedFields.error.flatten().fieldErrors
      );
    }

    await prisma.transaction.update({
      where: { id: parseInt(validatedFields.data.id as string) },
      data: {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        date: validatedFields.data.date,
        amount: validatedFields.data.amount,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Data berhasil diperbaharui.",
    };
  } catch (error) {
    return getActionError(error);
  }
}
