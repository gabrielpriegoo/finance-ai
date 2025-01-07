import { TransactionType } from "@prisma/client";

export type TransactionTypePercentage = {
  [key in TransactionType]: number;
};
