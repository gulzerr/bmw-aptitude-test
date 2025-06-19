import express from "ultimate-express";
import bodyParser from "body-parser";
import cors from "cors";
import prisma from "./utils/db";
import morganBody from "morgan-body";
import electricCarsRouter from "./controllers/electricCars";

const app = express();

app.use(bodyParser.json());
morganBody(app);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/test-db", async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/electric-cars", electricCarsRouter);
export default app;
