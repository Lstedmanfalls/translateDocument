import fs from 'fs';
import { clearTmpFile } from '../clearTmpFile';

jest.mock('fs');
test('clearTmpFile should error if file does not exist', () => {
  (fs.existsSync as jest.Mock).mockReturnValue(false);
  expect(() => clearTmpFile('testFilePath.pdf')).toThrow('File does not exist');
});

test('clearTmpFile should not error if file exists', () => {
  (fs.existsSync as jest.Mock).mockReturnValue(true);
  (fs.unlinkSync as jest.Mock).mockReturnValue(true);
  expect(clearTmpFile('testFilePath.pdf')).toBeUndefined();
});
