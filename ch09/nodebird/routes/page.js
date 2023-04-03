const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middleware");
const {
  renderProfile,
  renderJoin,
  renderMain,
} = require("../controllers/page");

const router = express.Router();

// root단 엔드포인트
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.follwingIdList = [];
  next();
});

router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;
