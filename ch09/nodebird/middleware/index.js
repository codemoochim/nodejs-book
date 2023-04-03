exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // isAuthenticated 이 메서드를 내부에서 어떻게 구현했지?
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("이미 로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
