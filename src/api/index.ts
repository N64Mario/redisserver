import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import helmet from "helmet";
import compression from "compression";
const app = express();
app.use(cors({ origin: true }));
app.use(helmet());
app.use(compression())
const routes = express.Router();
app.use(express.json());
require("./Link").default(routes);

app.use("/api", routes);

export default app;
