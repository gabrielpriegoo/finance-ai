import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactions_columns } from "./_columns";

const TransactionsPage = async () => {
  // acessar transações do banco de dados
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      {/* TITULO E BOTAO */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          Adicionar transação <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable columns={transactions_columns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
