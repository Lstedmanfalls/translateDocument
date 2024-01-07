import express from 'express';
import fileupload from 'express-fileupload';
import { uploadFile } from '../services/uploadFile';
import { createTranslatedDocument } from '../services/createTranslatedDocument';
import { exportTranslationDoc } from '../services/exportTranslationDoc';
import { clearTmpFile } from '../helpers/clearTmpFile';
import { getPath } from '../helpers/getPath';

const router = express.Router();
router.use(express.json());
router.use(fileupload());

router.post('/upload', (req, res) => {
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

router.post('/translate', async (req, res) => {
  const uploadFileName = req.body?.uploadFileName;
  if (!uploadFileName) {
    return res.status(400).send('Error: No uploadFileName specified');
  }
  const targetLang = req.body?.targetLang;
  if (!targetLang) {
    return res.status(400).send('Error: No targetLang specified');
  }
  const start = req.body?.start;
  const end = req.body?.end;

  try {
    res.send(await createTranslatedDocument(uploadFileName, targetLang, start, end));
    return clearTmpFile(getPath('uploaded', uploadFileName));
  }
  catch (e) {
    return res.status(500).send(e);
  }
});

router.get('/download/:translationFileName', (req, res) => {
  const translationFileName = req.params?.translationFileName;
  if (!translationFileName) {
    return res.status(400).send('Error: No translationFileName specified');
  }
  const { options } = exportTranslationDoc();
  try {
    return res.sendFile(translationFileName, options, (e) => {
      if (e) {
        throw new Error (`${e}`);
      }
      clearTmpFile(getPath('translated', translationFileName));
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
