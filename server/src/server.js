// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { ConnectDB } from "./config/db.js";
// import { userRouter } from "./routes/user-router.js";
// import { incomeRouter } from "./routes/income-router.js";
// import * as path from "path";
// import { goalRouter } from "./routes/goal-router.js";
// import { expenseRouter } from "./routes/expense-router.js";
// import budgetRouter from "./routes/budget-router.js";
// import { dashboardRouter } from "./routes/dashboard-router.js";
// import notificationRouter from "./routes/notification-routes.js";

// dotenv.config();

// //for vercel
// // ConnectDB();

// app.use(async (req, res, next) => {
//   try {
//     await ConnectDB();
//     next();
//   } catch (err) {
//     res.status(500).json({ message: "Database connection failed" });
//   }
// });

// const app = express();

// //  CORS setup
// const FRONTEND_URL = process.env.FRONT_END_URL || "http://localhost:5173";

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // app.use(
// //   "/uploads/users",
// //   express.static(path.join(process.cwd(), "uploads", "users"))
// // );

// //for vercel
// // if (process.env.VERCEL) {
// //   console.log("Uploads disabled on Vercel");
// // } else {
// //   app.use(
// //     "/uploads/users",
// //     express.static(path.join(process.cwd(), "uploads", "users"))
// //   );
// // }

// app.use("/api/user", userRouter);
// app.use("/api/income", incomeRouter);
// app.use("/api/goal", goalRouter);
// app.use("/api/expense", expenseRouter);
// app.use("/api/budget", budgetRouter);
// app.use("/api/dashboard", dashboardRouter);
// app.use("/api/notification", notificationRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "Backend running" });
// });
// const pathIs = path.join(process.cwd(), "uploads", "users");
// console.log("pathIds----", pathIs);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// //   console.log(`Allowed origin: ${FRONTEND_URL}`);
// // });

// //for vercel deployement
// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./config/db.js";
import { userRouter } from "./routes/user-router.js";
import { incomeRouter } from "./routes/income-router.js";
import * as path from "path";
import { goalRouter } from "./routes/goal-router.js";
import { expenseRouter } from "./routes/expense-router.js";
import budgetRouter from "./routes/budget-router.js";
import { dashboardRouter } from "./routes/dashboard-router.js";
import notificationRouter from "./routes/notification-routes.js";

dotenv.config();

const app = express();

// -------------------
// Connect to MongoDB
// -------------------
ConnectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // stop the app if DB fails
  });

// -------------------
// Middleware
// -------------------
const FRONTEND_URL = process.env.FRONT_END_URL || "http://localhost:5173";

app.use(
  cors({
    origin: "*", // you can change to FRONTEND_URL for security
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// -------------------
// Static file serving
// -------------------
if (!process.env.VERCEL) {
  // Only serve uploads locally, not on Vercel
  app.use(
    "/uploads/users",
    express.static(path.join(process.cwd(), "uploads", "users"))
  );
}

// -------------------
// Routes
// -------------------
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/goal", goalRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/notification", notificationRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

// -------------------
// Path debug (optional)
// -------------------
const uploadsPath = path.join(process.cwd(), "uploads", "users");
console.log("Uploads path:", uploadsPath);

// -------------------
// Export for Vercel
// -------------------
export default app;
