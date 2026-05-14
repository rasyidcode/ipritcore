import {
  ActionFormValidationError,
  ActionResult,
  getActionError,
} from "@/lib/action";
import { parseIdr } from "@/lib/stringUtils";
import { TransactionType } from "@prisma/client";
import { z } from "zod";

type TransactionActionDeps = {
  getSessionUserId: () => Promise<number>;
  transaction: {
    create: (args: {
      data: {
        name: string;
        type: TransactionType;
        date: Date;
        amount: number;
        categoryId: number;
        userId: number;
      };
    }) => Promise<unknown>;
    updateMany: (args: {
      where: {
        id: number;
        userId: number;
      };
      data: {
        name: string;
        type: TransactionType;
        date: Date;
        amount: number;
        categoryId: number;
      };
    }) => Promise<{ count: number }>;
    deleteMany: (args: {
      where: {
        id: number;
        userId: number;
      };
    }) => Promise<{ count: number }>;
  };
  revalidatePath: (path: string) => void;
};

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
  categoryId: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
});

const createTransactionSchema = transactionSchema;

const updateTransactionSchema = transactionSchema.extend({
  id: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
});

export function createTransactionActions(deps: TransactionActionDeps) {
  return {
    async createTransactionAction(
      _prevState: ActionResult,
      formData: FormData,
    ): Promise<ActionResult> {
      try {
        const validatedFields = createTransactionSchema.safeParse({
          name: formData.get("name"),
          type: formData.get("type"),
          date: formData.get("date"),
          amount: formData.get("amount"),
          categoryId: formData.get("categoryId"),
        });

        if (!validatedFields.success) {
          throw new ActionFormValidationError(
            "Validasi gagal!",
            validatedFields.error.flatten().fieldErrors,
          );
        }

        const userId = await deps.getSessionUserId();

        await deps.transaction.create({
          data: {
            name: validatedFields.data.name,
            type: validatedFields.data.type,
            date: validatedFields.data.date,
            amount: validatedFields.data.amount,
            categoryId: validatedFields.data.categoryId,
            userId,
          },
        });

        deps.revalidatePath("/");

        return {
          success: true,
          message: "Berhasil membuat transaksi.",
        };
      } catch (error) {
        return getActionError(error);
      }
    },

    async updateTransactionAction(
      _prevState: ActionResult,
      formData: FormData,
    ): Promise<ActionResult> {
      try {
        const validatedFields = updateTransactionSchema.safeParse({
          id: formData.get("id"),
          name: formData.get("name"),
          type: formData.get("type"),
          date: formData.get("date"),
          amount: formData.get("amount"),
          categoryId: formData.get("categoryId"),
        });

        if (!validatedFields.success) {
          throw new ActionFormValidationError(
            "Validasi gagal!",
            validatedFields.error.flatten().fieldErrors,
          );
        }

        const userId = await deps.getSessionUserId();

        const { count } = await deps.transaction.updateMany({
          where: {
            id: validatedFields.data.id,
            userId,
          },
          data: {
            name: validatedFields.data.name,
            type: validatedFields.data.type,
            date: validatedFields.data.date,
            amount: validatedFields.data.amount,
            categoryId: validatedFields.data.categoryId,
          },
        });

        if (count === 0) {
          throw new Error("Transaksi tidak ditemukan.");
        }

        deps.revalidatePath("/");

        return {
          success: true,
          message: "Data berhasil diperbaharui.",
        };
      } catch (error) {
        return getActionError(error);
      }
    },

    async deleteByIdAction(id: number): Promise<ActionResult> {
      try {
        const userId = await deps.getSessionUserId();

        const { count } = await deps.transaction.deleteMany({
          where: { id, userId },
        });

        if (count === 0) {
          throw new Error("Transaksi tidak ditemukan.");
        }

        deps.revalidatePath("/");

        return {
          success: true,
          message: "Transaksi berhasil dihapus.",
        };
      } catch (error) {
        return getActionError(error);
      }
    },
  };
}
