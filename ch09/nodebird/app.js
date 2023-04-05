const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models"); // 시퀄라이즈 모델 연결학l dnlgo
const passportConfig = require("./passport");

const app = express();
console.log("11번");
passportConfig();
console.log("22번");
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false }) // 서버를 실행할 때마다 테이블을 제생성 할건지?
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 600000,
    },
  })
);
console.log("33번");
app.use(passport.initialize()); // req객체에 passport 설정을 심음
console.log("44번");
app.use(passport.session()); // req.session객체에 passport 정보를 저장
console.log("55번");

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_NEW !== "production" ? err : {};
  res.status(err.stats || 500);
  res.render("error");
});
app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} 포트 번호로 연결 완료`);
});
