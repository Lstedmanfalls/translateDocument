import fs from 'fs';

export const getPath = (dir: string, fileName?: string): string => {
  const allowedDirs = ['uploaded', 'translated'];
  if (!allowedDirs.includes(dir)) {
    throw new Error ('Invalid directory');
  }

  if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp');
  }

  const root = `tmp/${dir}`;
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }
  const path = fileName ? `${root}/${fileName}` : root;

  return path;
};
