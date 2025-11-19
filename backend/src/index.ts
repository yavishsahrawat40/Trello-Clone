import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import boardRoutes from "./routes/board"
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT =process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

app.use(cors());
app.use(express.json());

app.use("/api/board", boardRoutes);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => console.log("MongoDB Connection Error:", err));
