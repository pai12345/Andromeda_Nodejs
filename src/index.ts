import { oServe } from "./dev/UtilityClass";
import express, { json } from "express";
import router from "./routes/route";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(compression());

app.use("/api/", router);

app.listen(PORT, () => {
  console.log(`${oServe.Status.ListeningonPort}: ${PORT}`);
});
