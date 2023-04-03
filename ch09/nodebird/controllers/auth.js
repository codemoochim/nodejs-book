const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      // req.login 은 passport.serializeUser 를 호출하고
      // req.login에 제공하는 user 객체가 serializeUser 로 넘어가게 된다.
      // 또한 이때, connext.sid 세션 쿠키가 브라우저에 전송된다
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    // req.logout 메서드는 req.user 객체와 req.session 객체를 제거한다.
    // req.logout 메서드는 콜백함수를 인수로 받고 세션 정보를 지운다.
    res.redirect("/");
  });
};
