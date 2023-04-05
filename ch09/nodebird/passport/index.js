const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 로그인시 실행됨. 세션에 저장할 정보를 지정함
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // 매 요청마다 실행됨
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user)) // req.user 에 사용자 정보 할당
      .catch((err) => done(err));
  });
  // passport.deserializeUser((id, done) => {
  //   // 매 요청마다 실행됨
  //   User.findOne({ where: { id } })
  //     .then((user) => done(null, user)) // req.user 에 사용자 정보 할당
  //     .catch((err) => done(err));
  // });

  local();
  kakao();
};

// const passport = require("passport");
// const local = require("./localStrategy");
// const kakao = require("./kakaoStrategy");
// const User = require("../models/user");

// module.exports = () => {
//   console.log("66번");
//   passport.serializeUser((user, done) => {
//     console.log("시리얼라이즈");
//     console.log(user);
//     console.log("77번");
//     console.log("serializeUser 4번");
//     console.log(user.id);
//     done(null, user.id);
//     console.log("88번");
//   });
//   console.log("99번");
//   passport.deserializeUser((id, done) => {
//     console.log("아이디");
//     console.log(id);
//     console.log("1010번");
//     User.findOne({ where: { id } })
//       .then((user) => {
//         console.log("deserializeUser 6번");
//         console.log("1111번");
//         console.log("디시리얼라이즈");
//         console.log(user);
//         done(null, user);
//         console.log("1212번");
//       })
//       .catch((err) => done(err));
//   });
//   console.log("1313번");
//   local();
//   console.log("1414번");
//   kakao();
//   console.log("1515번");
// };
