import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js"; 
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';

import transactionsRoute from "./routes/transactiosRoute.js";
import job from "./config/cron.js";
dotenv.config();

// ✅ Define app first
const app = express();

if(process.env.NODE_ENV==="production")job.start();



// ✅ Use middleware after app is defined
app.use(cors());
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req,res) =>{
    res.status(200).json({status:"ok"})
});

// ✅ Set up routes
app.use("/api/transactions", transactionsRoute);

console.log("my port:", process.env.PORT);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
