import express from 'express';
import {sql} from '../config/db.js'; 
import { createTransaction, deleteTransaction, getTransactionsByUserId, getTransactionSummary } from '../controllers/transactionsController.js';

const router = express.Router();



// 🟢 Place specific routes first
router.get("/summary/:user_id", getTransactionSummary);

// 🔴 Put generic catch-all routes afterwards
router.get("/:user_id", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

    
export default router;  