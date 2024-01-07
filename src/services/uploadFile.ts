import fileupload from 'express-fileupload';
import { getPath } from '../helpers/getPath';
import { getNewFileName } from '../helpers/getNewFileName';

export const uploadFile = (uploadedFile: fileupload.UploadedFile): { uploadFileName: string } => {
  const uploadFileName = getNewFileName(uploadedFile.name);
  const uploadPath = getPath('uploaded', uploadFileName);
  uploadedFile.mv(uploadPath, function (e) {
    if (e) {
      return new Error(e);
    }
  });
  return { uploadFileName };
};

// TODO: Need to add intermediate feature to show how many pages the document has, which will be default start and end in page number selector and be returned in this function;
