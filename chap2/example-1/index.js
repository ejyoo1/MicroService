// 코드에서 사용할 익스프레스 라이브러리를 불러온다.
const express = require("express");

// 익스프레스 앱의 인스턴스를 생성한다.
const app = express();

// HTTP 서버는 3000번 포트를 열고 대기한다.
const port = 3000;

app.get("/", (req, res) => { // HTTP 경로 처리기를 생성한다.
  res.send("Hello World!"); // 웹 브라우저에서 "Hello World!"를 출력하게 한다.
});

app.listen(port, () => { // HTTP 서버를 초기화한다.
  console.log(`Example app listening on port ${port}!`); // 서버가 시작되면 메시지를 출력하는 콜백함수이다.
});