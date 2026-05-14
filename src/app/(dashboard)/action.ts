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

const transactionSchema = z.object({
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

const createTransactionSchema = transactionSchema;

const updateTransactionSchema = transactionSchema.extend({
  id: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
});

export async function createTransactionAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const validatedFields = createTransactionSchema.safeParse({
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

    const userId = await getRequiredSessionUserId();

    await prisma.transaction.create({
      data: {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        date: validatedFields.data.date,
        amount: validatedFields.data.amount,
        userId,
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
    const validatedFields = updateTransactionSchema.safeParse({
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

    const userId = await getRequiredSessionUserId();

    const { count } = await prisma.transaction.updateMany({
      where: {
        id: validatedFields.data.id,
        userId,
      },
      data: {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        date: validatedFields.data.date,
        amount: validatedFields.data.amount,
      },
    });

    if (count === 0) {
      throw new Error("Transaksi tidak ditemukan.");
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Data berhasil diperbaharui.",
    };
  } catch (error) {
    return getActionError(error);
  }
}

export async function deleteByIdAction(id: number): Promise<ActionResult> {
  try {
    const userId = await getRequiredSessionUserId();

    const { count } = await prisma.transaction.deleteMany({
      where: { id, userId },
    });

    if (count === 0) {
      throw new Error("Transaksi tidak ditemukan.");
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Transaksi berhasil dihapus.",
    };
  } catch (error) {
    return getActionError(error);
  }
}

async function getRequiredSessionUserId(): Promise<number> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}
