import { Category } from "@prisma/client";

export type CategoryWithTransactionCount = Category & {
  _count: {
    transactions: number;
  };
};
