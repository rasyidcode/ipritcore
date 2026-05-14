import {
  ActionFormValidationError,
  ActionResult,
  getActionError,
} from "@/lib/action";
import { getMonthStart } from "@/lib/monthUtils";
import { parseIdr } from "@/lib/stringUtils";
import { TransactionType } from "@prisma/client";
import { z } from "zod";

type BudgetActionDeps = {
  getSessionUserId: () => Promise<number>;
  budget: {
    upsert: (args: {
      where: {
        userId_categoryId_month: {
          userId: number;
          categoryId: number;
          month: Date;
        };
      };
      update: {
        amount: number;
      };
      create: {
        userId: number;
        categoryId: number;
        month: Date;
        amount: number;
      };
    }) => Promise<unknown>;
  };
  category: {
    findUnique: (args: {
      where: {
        id: number;
      };
      select: {
        type: true;
      };
    }) => Promise<{ type: TransactionType } | null>;
  };
  revalidatePath: (path: string) => void;
};

const budgetSchema = z.object({
  categoryId: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .transform((val) => getMonthStart(val)),
  amount: z
    .string()
    .min(1)
    .transform((val) => parseIdr(val))
    .pipe(z.number().int().min(0)),
});

export function createBudgetActions(deps: BudgetActionDeps) {
  return {
    async upsertBudgetAction(
      _prevState: ActionResult,
      formData: FormData,
    ): Promise<ActionResult> {
      try {
        const validatedFields = budgetSchema.safeParse({
          categoryId: formData.get("categoryId"),
          month: formData.get("month"),
          amount: formData.get("amount"),
        });

        if (!validatedFields.success) {
          throw new ActionFormValidationError(
            "Validasi gagal!",
            validatedFields.error.flatten().fieldErrors,
          );
        }

        const userId = await deps.getSessionUserId();
        const category = await deps.category.findUnique({
          where: {
            id: validatedFields.data.categoryId,
          },
          select: {
            type: true,
          },
        });

        if (!category || category.type !== TransactionType.EXPENSE) {
          throw new Error("Anggaran hanya bisa dibuat untuk kategori pengeluaran.");
        }

        await deps.budget.upsert({
          where: {
            userId_categoryId_month: {
              userId,
              categoryId: validatedFields.data.categoryId,
              month: validatedFields.data.month,
            },
          },
          update: {
            amount: validatedFields.data.amount,
          },
          create: {
            userId,
            categoryId: validatedFields.data.categoryId,
            month: validatedFields.data.month,
            amount: validatedFields.data.amount,
          },
        });

        deps.revalidatePath("/budgets");
        deps.revalidatePath("/reports");

        return {
          success: true,
          message: "Anggaran berhasil disimpan.",
        };
      } catch (error) {
        return getActionError(error);
      }
    },
  };
}
