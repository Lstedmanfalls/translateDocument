import fs from 'fs';

export const clearTmpFile = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    throw new Error('File does not exist');
  }
  fs.unlinkSync(filePath);
};
