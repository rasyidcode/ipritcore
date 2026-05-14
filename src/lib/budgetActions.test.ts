import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { TransactionType } from "@prisma/client";
import { createBudgetActions } from "./budgetActions";

const initialState = {
  success: null,
};

function makeFormData(
  values: Record<string, string> = {
    categoryId: "3",
    month: "2026-05",
    amount: "Rp 1.500.000",
  },
) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.set(key, value);
  });

  return formData;
}

function createDeps({
  userId = 7,
  categoryUserId = userId,
  categoryType = TransactionType.EXPENSE,
  categoryExists = true,
  rejectSession = false,
}: {
  userId?: number;
  categoryUserId?: number;
  categoryType?: TransactionType;
  categoryExists?: boolean;
  rejectSession?: boolean;
} = {}) {
  const upsertCalls: unknown[] = [];
  const revalidatedPaths: string[] = [];

  return {
    upsertCalls,
    revalidatedPaths,
    actions: createBudgetActions({
      getSessionUserId: async () => {
        if (rejectSession) {
          throw new Error("Unauthorized");
        }

        return userId;
      },
      budget: {
        upsert: async (args) => {
          upsertCalls.push(args);
          return {};
        },
      },
      category: {
        findUnique: async () =>
          categoryExists
            ? {
                userId: categoryUserId,
                type: categoryType,
              }
            : null,
      },
      revalidatePath: (path) => {
        revalidatedPaths.push(path);
      },
    }),
  };
}

describe("upsertBudgetAction", () => {
  it("upserts a monthly budget for the authenticated user", async () => {
    const deps = createDeps({ userId: 42 });

    const result = await deps.actions.upsertBudgetAction(
      initialState,
      makeFormData(),
    );

    assert.equal(result.success, true);
    assert.deepEqual(deps.upsertCalls, [
      {
        where: {
          userId_categoryId_month: {
            userId: 42,
            categoryId: 3,
            month: new Date(2026, 4, 1),
          },
        },
        update: {
          amount: 1500000,
        },
        create: {
          userId: 42,
          categoryId: 3,
          month: new Date(2026, 4, 1),
          amount: 1500000,
        },
      },
    ]);
    assert.deepEqual(deps.revalidatedPaths, ["/budgets", "/reports"]);
  });

  it("rejects unauthenticated calls", async () => {
    const deps = createDeps({ rejectSession: true });

    const result = await deps.actions.upsertBudgetAction(
      initialState,
      makeFormData(),
    );

    assert.equal(result.success, false);
    assert.equal(result.error, "Unauthorized");
    assert.deepEqual(deps.upsertCalls, []);
  });

  it("rejects income categories", async () => {
    const deps = createDeps({ categoryType: TransactionType.INCOME });

    const result = await deps.actions.upsertBudgetAction(
      initialState,
      makeFormData(),
    );

    assert.equal(result.success, false);
    assert.equal(result.error, "Anggaran hanya bisa dibuat untuk kategori pengeluaran.");
    assert.deepEqual(deps.upsertCalls, []);
  });

  it("rejects another user's category", async () => {
    const deps = createDeps({ userId: 42, categoryUserId: 99 });

    const result = await deps.actions.upsertBudgetAction(
      initialState,
      makeFormData(),
    );

    assert.equal(result.success, false);
    assert.equal(result.error, "Anggaran hanya bisa dibuat untuk kategori pengeluaran.");
    assert.deepEqual(deps.upsertCalls, []);
  });

  it("rejects invalid month and amount", async () => {
    const deps = createDeps();

    const result = await deps.actions.upsertBudgetAction(
      initialState,
      makeFormData({
        categoryId: "3",
        month: "Mei 2026",
        amount: "",
      }),
    );

    assert.equal(result.success, false);
    assert.equal(result.error, "Validasi gagal!");
    assert.ok(result.errors?.month);
    assert.ok(result.errors?.amount);
    assert.deepEqual(deps.upsertCalls, []);
  });
});
