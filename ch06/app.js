import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

const index = "/apple/index.html";
const dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(morgan("dev"));

app.use("/apple", express.static(path.join(dirname, "public-0505")));
app.get(`${index}`, (req, res) => {
  // res.send("Hello, Express res.send");
  res.sendFile(path.join(dirname, "index.html"));
});
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
