import express from "express";
import { exec } from "child_process";
import cors from "cors";
import { mint } from "./mint.js";

const app = express();
const port = 3030;

// 포트 열기
app.listen(port, function () {
  console.log("start! express server on port 3030");
});

// /exec로 리퀘 들어오면 다음 라인들 실행
app.get("/exec", cors(), (req, res) => {
  exec_python_script();
  res.sendStatus(200);
});

// 파이썬 mergeimage.py 실행 -> 좀 기다려야 함 (한 30초?) 근데 exec()으로 돌리는게 바람직해보이지는 않음..
const exec_python_script = () => {
  const merge_image_and_upload_by_python = "python3 ./mergeimage.py";
  exec(merge_image_and_upload_by_python, (error, stdout, stderr) => {
    // 파이썬 실행 결과에 따라
    if (error || stderr) {
      // 에러 있으면 리턴
      console.log(`error: ${error.message}`);
      return;
    }
    if (stdout) {
      // 파이썬 파일에서 출력한 url과 name 받아서 mint()에 인자로 줘서 실행
      let pythonres = stdout.toString();
      if (pythonres == "no\n") {
        console.log("EXECUTED");
        return;
      }

      const url = pythonres.split("\n")[0];
      const name = pythonres.split("\n")[1];

      console.log("url:", url);
      console.log("name:", name);
      const minted = mint(url, name);
      return;
    }
  });
};
