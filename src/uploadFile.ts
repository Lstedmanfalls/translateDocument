import fileupload from 'express-fileupload';
import { getPath } from './helpers/getPath';

export const uploadFile = (file: fileupload.UploadedFile): { uploadFileName: string } => {
  const date = Date.now();
  const fileNameSplitExt = file.name.split('.');
  const uploadFileName = `${fileNameSplitExt[0]}_${date}.${fileNameSplitExt[1]}`;
  const uploadPath = getPath('uploaded', uploadFileName);
  file.mv(uploadPath, function (e) {
    if (e) {
      return new Error(e);
    }
  });
  return { uploadFileName };
};

// TODO: Need to add intermediate feature to show how many pages the document has, which will be default start and end in page number selector and be returned in this function;
