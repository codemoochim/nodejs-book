const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  console.log("66번");
  passport.serializeUser((user, done) => {
    console.log("시리얼라이즈");
    console.log(user);
    console.log("77번");
    console.log("serializeUser 4번");
    console.log(user.id);
    done(null, user.id);
    console.log("88번");
  });
  console.log("99번");
  passport.deserializeUser((id, done) => {
    console.log("아이디");
    console.log(id);
    console.log("1010번");
    User.findOne({ where: { id } })
      .then((user) => {
        console.log("deserializeUser 6번");
        console.log("1111번");
        console.log("디시리얼라이즈");
        console.log(user);
        done(null, user);
        console.log("1212번");
      })
      .catch((err) => done(err));
  });
  console.log("1313번");
  local();
  console.log("1414번");
  kakao();
  console.log("1515번");
};
