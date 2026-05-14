"use server";

import {
  ActionFormValidationError,
  ActionResult,
  getActionError,
} from "@/lib/action";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1),
  type: z
    .string()
    .min(1)
    .transform((val) =>
      val === "income" ? TransactionType.INCOME : TransactionType.EXPENSE
    ),
});

const updateCategorySchema = categorySchema.extend({
  id: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
});

export async function createCategoryAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const validatedFields = categorySchema.safeParse({
      name: formData.get("name"),
      type: formData.get("type"),
    });

    if (!validatedFields.success) {
      throw new ActionFormValidationError(
        "Validasi gagal!",
        validatedFields.error.flatten().fieldErrors
      );
    }

    const userId = await getRequiredSessionUserId();

    await prisma.category.create({
      data: {
        ...validatedFields.data,
        userId,
      },
    });

    revalidatePath("/categories");
    revalidatePath("/");

    return {
      success: true,
      message: "Kategori berhasil dibuat.",
    };
  } catch (error) {
    return getActionError(error);
  }
}

export async function updateCategoryAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const validatedFields = updateCategorySchema.safeParse({
      id: formData.get("id"),
      name: formData.get("name"),
      type: formData.get("type"),
    });

    if (!validatedFields.success) {
      throw new ActionFormValidationError(
        "Validasi gagal!",
        validatedFields.error.flatten().fieldErrors
      );
    }

    const userId = await getRequiredSessionUserId();
    const { count } = await prisma.category.updateMany({
      where: {
        id: validatedFields.data.id,
        userId,
      },
      data: {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
      },
    });

    if (count === 0) {
      throw new Error("Kategori tidak ditemukan.");
    }

    revalidatePath("/categories");
    revalidatePath("/");

    return {
      success: true,
      message: "Kategori berhasil diperbarui.",
    };
  } catch (error) {
    return getActionError(error);
  }
}

export async function deleteCategoryAction(id: number): Promise<ActionResult> {
  try {
    const userId = await getRequiredSessionUserId();
    const { count } = await prisma.category.deleteMany({
      where: { id, userId },
    });

    if (count === 0) {
      throw new Error("Kategori tidak ditemukan.");
    }

    revalidatePath("/categories");
    revalidatePath("/");

    return {
      success: true,
      message: "Kategori berhasil dihapus.",
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
