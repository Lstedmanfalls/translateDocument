import express from 'express';
import fileupload from 'express-fileupload';
import { uploadFile } from './uploadFile';
import { createTranslatedDocument } from './createTranslatedDocument';

const app = express();
const port = 3000;

app.use(express.json());
app.use(fileupload());

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('Error: No file uploaded');
  }
  const file = req.files.file as fileupload.UploadedFile;
  try {
    return res.send(uploadFile(file));
  }
  catch (e) {
    return res.status(500).send(e);
  }
});

app.post('/translate', async (req, res) => {
  const { uploadFileName } = req.body;
  if (!uploadFileName) {
    return res.status(400).send('Error: No file name specified');
  }
  const start = req.body?.start;
  const end = req.body?.end;
  try {
    return res.send(await createTranslatedDocument(uploadFileName, start, end));
  }
  catch (e) {
    return res.status(500).send(e);
  }
});

// TODO: Add a download route to send the word document back to the frontend

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
