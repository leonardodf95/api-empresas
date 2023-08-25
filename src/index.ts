import "express-async-errors";
import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import errorsMiddleware from "./middlewares/errors";

const app = express();
const port = process.env.SERVER_PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorsMiddleware);

app.get("/", (req, res) => {
  res.send(`© CM Sistemas LTDA - ${new Date().getFullYear()}`);
});

app.listen(port, () => {
  console.log(`-> Service start on port ${port}.`);
});
