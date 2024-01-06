import fs from 'fs';

export const clearTmpFile = (filePath: string): void => {
  fs.unlinkSync(filePath);
};
