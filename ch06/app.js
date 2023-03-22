import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);
// 2. qs 모듈 빌트인 되었는지 테스트(nested)해보고 docs 찾아보기

const index = "/apple/index.html";
const dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(morgan("dev"));

app.use("/apple", express.static(path.join(dirname, "public-0505")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// express 4.17 이후 raw, text 바디파서 메서드도 지원함. body-parser 패키지 설치 필요 없음
app.use(express.raw());
app.use(express.text());

// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     escret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//     name: "session-cookie",
//   })
// );

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
