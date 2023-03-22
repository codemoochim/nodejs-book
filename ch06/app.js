import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import a1 from "./index3.js";
import upload from "./middleware/multer.js";
import fs from "node:fs";

dotenv.config();
const app = express();

// 포트번호 세팅
app.set("port", process.env.PORT || 3000);

// 개밣환경에 따른 morgan 로그
// app.use(morgan("dev"));
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});

// 바디파서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 쿠키파서
app.use(cookieParser(process.env.COOKIE_SECRET));

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error(err);
  fs.mkdirSync("uploads");
}

// 루트경로
const dirname = path.dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
  // res.sendFile(path.join(dirname, "/index.html"));
  res.send("connect complete");
});

// 멀터
app.get("/mul", (req, res) => {
  res.sendFile(path.join(dirname, "/multipart_html/multipart_single.html"));
});

app.post("/mul", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  res.send("ok");
});

// 쿠키
// app.get("/setCookie", (req, res) => {
//   res
//     .cookie("name", "sando", {
//       maxAge: 600000, // 1분
//       httpOnly: true,
//       signed: true,
//     })
//     .send("쿠키?");
// });
// app.get("/checkCookie", (req, res) => {
//   console.log(req.signedCookies);
//   res.send(req.signedCookies);
// });
// app.get("/deCookie", (req, res) => {
//   res.clearCookie("name", "sando", { httpOnly: true, signed: true });
//   // res.clearCookie(undefined, undefined, {});
//   res.send("완료?");
// });

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
