"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { TransactionType } from "@prisma/client";
import prisma from "@/lib/prisma";

import {
  ActionFormValidationError,
  ActionResult,
  getActionError,
} from "@/lib/action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function create(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const schema = z.object({
      type: z
        .string()
        .min(1)
        .transform((val) => {
          if (val == "expense") {
            return TransactionType.EXPENSE;
          } else if (val == "income") {
            return TransactionType.INCOME;
          } else {
            return TransactionType.EXPENSE;
          }
        }),
      date: z
        .string()
        .min(1)
        .transform((val) => new Date(val)),
      amount: z.number().min(1000),
      note: z.string().min(1),
      category: z.number().min(1),
      account: z.number().min(1),
    });

    const validatedFields = schema.safeParse({
      type: formData.get("type"),
      date: formData.get("date"),
      amount: parseInt(formData.get("amount") as string),
      note: formData.get("note"),
      account: parseInt(formData.get("account") as string),
      category: parseInt(formData.get("category") as string),
    });

    if (!validatedFields.success) {
      throw new ActionFormValidationError(
        "Validation error",
        validatedFields.error.flatten().fieldErrors
      );
    }

    const session = await getServerSession(authOptions);

    await prisma.transaction.create({
      data: {
        name: validatedFields.data.note,
        type: validatedFields.data.type,
        date: validatedFields.data.date,
        amount: validatedFields.data.amount,
        userId: session?.user.id as number,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Create successful!",
    };
  } catch (error) {
    const actionErr = getActionError(error);

    return actionErr;
  }
}
