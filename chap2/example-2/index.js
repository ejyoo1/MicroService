const express = require("express");
// 내장된 fs 라이브러리를 사용해서 Node.js에서 파일 시스템 API를 쓸 수 있다.
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/video", (req, res) => { // 비디오 스트리밍을 위한 REST API인 HTTP 경로를 정의한다.
  const path = "../videos/SampleVideo_1280x720_1mb.mp4"; // 브라우저에 전송할 스트리밍 비디오의 경로
  fs.stat(path, (err, stats) => { // 비디오 파일의 크기를 가져온다. 웹 브라우저에 전송할 HTTP 헤더에 인코드 한다.

    //#region 오류가 발생할 경우 여기서 처리한다.
    if (err) {
      console.error("An error occurred");
      res.sendStatus(500);
      return;
    }
    //#endregion

    //#region 콘텐츠 길이와 마임 타입(mime type) 을 포함하는 응답 헤더를 브라우저에 전송한다.
    res.writeHead(200, {
      "Content-Length": stats.size,
      "Content-Type": "video/mp4",
    });
    //#endregion
    
    // 브라우저에 비디오를 스트리밍 한다.
    fs.createReadStream(path).pipe(res);
  });
});

app.listen(port, () => {
  console.log(`Microservice listening on port ${port}, point your browser at http://localhost:3000/video`);
});