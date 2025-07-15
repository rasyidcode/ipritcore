'use client';

import { useEffect, useState } from "react";
import NewTransactionButton from "./NewTransactionButton";
import TransactionList from "./TransactionList";
import TransactionSummary from "./TransactionSummary";
import { Transaction, TransactionType } from "@prisma/client";
import { fetchTransactions } from "../action";

export default function DashboardContent() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const balance = transactions.reverse().reduce((acc, curr) => {
        if (curr.type === TransactionType.INCOME) {
            return acc + curr.amount;
        }

        return acc - curr.amount;
    }, 0);
    const totalExpenses = transactions
        .reverse()
        .reduce(
            (acc, curr) =>
                curr.type === TransactionType.EXPENSE ? acc + curr.amount : acc,
            0
        );

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTransactions();
            console.log(data);
            setTransactions(data);
        }

        fetchData();
    }, [])

    return (
        <>
            <TransactionSummary balance={balance} totalExpenses={totalExpenses} />
            <NewTransactionButton />
            <div className="flex-1 flex flex-col mt-4 overflow-hidden">
                <h2 className="text-lg font-semibold">Transaksi Bulan Ini</h2>
                <TransactionList transactions={transactions} />
            </div>
        </>
    )
}

