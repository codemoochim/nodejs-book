// package.json에 type:module 을 추가하여 CJS 를 EMS로 바꾸어보았다
// const express = require("express");
// const path = require('path');
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.set("port", process.env.PORT || 3000);

console.log(import.meta.url); // file:///Users/sando/Desktop/nodejs101/ch06/app.js
/**
 * new URL('file:///C:/path/').pathname;      // Incorrect: /C:/path/
 * fileURLToPath('file:///C:/path/');         // Correct:   C:\path\ (Windows)
 * new URL('file://nas/foo.txt').pathname;    // Incorrect: /foo.txt
 * fileURLToPath('file://nas/foo.txt');       // Correct:   \\nas\foo.txt (Windows)
 */
const dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(dirname); // /Users/sando/Desktop/nodejs101/ch06

// res.send와 res.sendFile 순서 상관 없이 res.send의 우선순위가 더 높다
app.get("/", (req, res) => {
  // res.send("Hello, Express");
  res.sendFile(path.join(dirname, "/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
