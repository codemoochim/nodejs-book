const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middleware");
const { join, login, logout } = require("../controllers/auth.js");

const router = express.Router();

router.post("/join", isNotLoggedIn, join);

router.post("/login", isNotLoggedIn, login);

router.get("/logout", isLoggedIn, logout);

// GET /auth/kakao
router.get("/kakao", passport.authenticate("kakao"));

// GET /auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패", // 실패 시
  }),
  (req, res) => {
    res.redirect("/"); // 성공 시에는 /로 이동
  }
);

module.exports = router;
