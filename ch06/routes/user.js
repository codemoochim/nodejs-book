import express from "express";
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello, User");
// });

router.get(
  "/",
  (req, res, next) => {
    next("route");
  },
  (req, res, next) => {
    console.log("실행안됨");
  }
);
router.get("/", (req, res, next) => {
  console.log("실행됨");

  res.end("asdfasdf");
  res.send();
  res.json();
});

export default router;
