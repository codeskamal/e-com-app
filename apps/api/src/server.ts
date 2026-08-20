import dotenv from "dotenv";
import app from "./app.js";
import { PORT } from "./config/index.js";

dotenv.config();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
