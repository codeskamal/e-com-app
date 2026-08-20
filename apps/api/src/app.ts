import express, { type Application } from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { notFoundHandler } from "./common/middleware/not-found.js";
import { errorHandler } from "./common/middleware/error-handler.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
