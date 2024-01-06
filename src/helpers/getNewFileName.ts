import { parseFileNameExt } from './parseFileNameExt';

export const getNewFileName = (originalFileName: string, newExt?: string): string => {
  const { fileName, ext } = parseFileNameExt(originalFileName);
  const extension = newExt ? newExt: ext;
  const date = Date.now();
  const newFileName = `${fileName}_${date}.${extension}`;
  return newFileName;
};
