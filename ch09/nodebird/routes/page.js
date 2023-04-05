const express = require("express");
// const { isLoggedIn, isNotLoggedIn } = require("../middleware");
const { isLoggedIn, isNotLoggedIn } = require("../middleware");
const {
  renderProfile,
  renderJoin,
  renderMain,
  renderHashtag,
} = require("../controllers/page");

const router = express.Router();

// root단 엔드포인트
router.use((req, res, next) => {
  res.locals.user = req.user; // 여기서의 req.user 는 deserializeUser 가 할당해주는 객체임
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next();
});

router.get("/hashtag", renderHashtag);
router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;
