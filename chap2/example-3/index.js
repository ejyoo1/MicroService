const express = require("express");
const fs = require("fs");

const app = express();

//#region 환경변수를 설정하지 않았다면 오류를 발생시킨다. 지정되지 않은 경우 기본 값을사용하도록 구성할 수도 있다.
if (!process.env.PORT) {
  throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}
//#endregion

// 환경변수를 글로벌 변수로 가져와서 쉽게 접근할 수 있다.
const PORT = process.env.PORT;

app.get("/video", (req, res) => {

  const path = "../videos/SampleVideo_1280x720_1mb.mp4";
  fs.stat(path, (err, stats) => {
      if (err) {
          console.error("An error occurred ");
          res.sendStatus(500);
          return;
      }

      res.writeHead(200, {
          "Content-Length": stats.size,
          "Content-Type": "video/mp4",
      });
      fs.createReadStream(path).pipe(res);
  });
});

// 마이크로 서비스의 입력으로 받은 포트 번호로 HTTP 서버를 시작
app.listen(PORT, () => {
  console.log(`Service listening on port ${PORT}`);
});