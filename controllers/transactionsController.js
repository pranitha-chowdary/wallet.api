

import { sql } from '../config/db.js';


export async function getTransactionsByUserId(req, res) {
    try {
        const { user_id } = req.params;
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC
        `;
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error fetching transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function createTransaction(req, res) {
    try {
        const { user_id, title, amount, category } = req.body;
        if (!title || amount === undefined || !category || !user_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;

        console.log(transaction);
        res.status(201).json(transaction[0]);
    } catch (error) {
        console.log("Error creating transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function deleteTransaction(req, res) {
   async (req, res) => {
       try {
         const{id}=req.params;
   
         if(isNaN(parseInt(id))){
           return res.status(400).json({message:"Invalid transaction ID"});
         }
         const result= await sql`
           DELETE FROM transactions WHERE id = ${id} RETURNING *
         `
         if (result.length === 0) {
           return res.status(404).json({ error: "Transaction not found" });
         }
   
         res.status(200).json({ message: "Transaction deleted successfully", transaction: result[0] });
   
       } catch (error) {
           console.log("Error deleting transaction:", error);
           res.status(500).json({ error: "Internal server error" });
       }
    }}

    export async function getTransactionSummary(req, res) {
    try {
        const { user_id } = req.params;

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${user_id}
        `;
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${user_id} AND amount > 0
        `;
        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE user_id = ${user_id} AND amount < 0
        `;

        res.status(200).json({
            balance: parseFloat(balanceResult[0].balance),
            income: parseFloat(incomeResult[0].income),
            expense: parseFloat(expenseResult[0].expense),
        });
    } catch (error) {
        console.error("Error getting the summary:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


        