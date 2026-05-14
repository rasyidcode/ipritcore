import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { TransactionType } from "@prisma/client";
import { createTransactionActions } from "./transactionActions";

const initialState = {
  success: null,
};

function makeFormData(
  values: Record<string, string> = {
    name: "Beli sayur",
    type: "expense",
    date: "2026-05-14",
    amount: "Rp 25.000",
    categoryId: "3",
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
  updateCount = 1,
  deleteCount = 1,
}: {
  userId?: number;
  updateCount?: number;
  deleteCount?: number;
} = {}) {
  const createCalls: unknown[] = [];
  const updateManyCalls: unknown[] = [];
  const deleteManyCalls: unknown[] = [];
  const revalidatedPaths: string[] = [];

  return {
    createCalls,
    updateManyCalls,
    deleteManyCalls,
    revalidatedPaths,
    actions: createTransactionActions({
      getSessionUserId: async () => userId,
      transaction: {
        create: async (args) => {
          createCalls.push(args);
          return {};
        },
        updateMany: async (args) => {
          updateManyCalls.push(args);
          return { count: updateCount };
        },
        deleteMany: async (args) => {
          deleteManyCalls.push(args);
          return { count: deleteCount };
        },
      },
      revalidatePath: (path) => {
        revalidatedPaths.push(path);
      },
    }),
  };
}

describe("createTransactionAction", () => {
  it("creates a transaction for the authenticated user", async () => {
    const deps = createDeps({ userId: 42 });

    const result = await deps.actions.createTransactionAction(
      initialState,
      makeFormData(),
    );

    assert.equal(result.success, true);
    assert.deepEqual(deps.createCalls, [
      {
        data: {
          name: "Beli sayur",
          type: TransactionType.EXPENSE,
          date: new Date("2026-05-14"),
          amount: 25000,
          categoryId: 3,
          userId: 42,
        },
      },
    ]);
    assert.deepEqual(deps.revalidatedPaths, ["/"]);
  });

  it("returns validation errors for invalid input", async () => {
    const deps = createDeps();

    const result = await deps.actions.createTransactionAction(
      initialState,
      makeFormData({
        name: "",
        type: "expense",
        date: "2026-05-14",
        amount: "Rp 25.000",
        categoryId: "3",
      }),
    );

    assert.equal(result.success, false);
    assert.equal(result.error, "Validasi gagal!");
    assert.ok(result.errors?.name);
    assert.deepEqual(deps.createCalls, []);
    assert.deepEqual(deps.revalidatedPaths, []);
  });
});

describe("updateTransactionAction", () => {
  it("updates by transaction id and authenticated user id", async () => {
    const deps = createDeps({ userId: 99 });

    const result = await deps.actions.updateTransactionAction(
      initialState,
      makeFormData({
        id: "123",
        name: "Gaji",
        type: "income",
        date: "2026-05-14",
        amount: "Rp 5.000.000",
        categoryId: "8",
      }),
    );

    assert.equal(result.success, true);
    assert.deepEqual(deps.updateManyCalls, [
      {
        where: {
          id: 123,
          userId: 99,
        },
        data: {
          name: "Gaji",
          type: TransactionType.INCOME,
          date: new Date("2026-05-14"),
          amount: 5000000,
          categoryId: 8,
        },
      },
    ]);
    assert.deepEqual(deps.revalidatedPaths, ["/"]);
  });

  it("requires an id", async () => {
    const deps = createDeps();

    const result = await deps.actions.updateTransactionAction(
      initialState,
      makeFormData(),
    );

    assert.equal(result.success, false);
    assert.equal(result.error, "Validasi gagal!");
    assert.ok(result.errors?.id);
    assert.deepEqual(deps.updateManyCalls, []);
    assert.deepEqual(deps.revalidatedPaths, []);
  });

  it("returns not found when no scoped row is updated", async () => {
    const deps = createDeps({ updateCount: 0 });

    const result = await deps.actions.updateTransactionAction(
      initialState,
      makeFormData({
        id: "123",
        name: "Beli sayur",
        type: "expense",
        date: "2026-05-14",
        amount: "Rp 25.000",
        categoryId: "3",
      }),
    );

    assert.equal(result.success, false);
    assert.equal(result.error, "Transaksi tidak ditemukan.");
    assert.deepEqual(deps.revalidatedPaths, []);
  });
});

describe("deleteByIdAction", () => {
  it("deletes by transaction id and authenticated user id", async () => {
    const deps = createDeps({ userId: 77 });

    const result = await deps.actions.deleteByIdAction(456);

    assert.equal(result.success, true);
    assert.deepEqual(deps.deleteManyCalls, [
      {
        where: {
          id: 456,
          userId: 77,
        },
      },
    ]);
    assert.deepEqual(deps.revalidatedPaths, ["/"]);
  });

  it("returns not found when no scoped row is deleted", async () => {
    const deps = createDeps({ deleteCount: 0 });

    const result = await deps.actions.deleteByIdAction(456);

    assert.equal(result.success, false);
    assert.equal(result.error, "Transaksi tidak ditemukan.");
    assert.deepEqual(deps.revalidatedPaths, []);
  });
});
