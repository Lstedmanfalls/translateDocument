import express from 'express';
import fileupload from 'express-fileupload';
// import os from 'os';
// import { exportWordDoc } from './exportWordDoc';

const app = express();
const port = 3000;

app.use(fileupload());

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No file uploaded');
  }
  const file = req.files.file as fileupload.UploadedFile;
  // const uploadPath = os.tmpdir() + file.name;
  const uploadPath = 'tmp/' + file.name;
  file.mv(uploadPath, function (e: Error) {
    if (e) {
      return res.status(500).send(e);
    } else {
      return res.send('File uploaded');
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
