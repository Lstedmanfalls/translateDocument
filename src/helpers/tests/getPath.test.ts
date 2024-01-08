import { getPath } from '../getPath';
import fs from 'fs';

jest.mock('fs');

test('getPath should error when dir not allowed', () => {
  expect(() => getPath('upload')).toThrow('Invalid directory');
});

test('getPath should return tmp directory path', () => {
  (fs.existsSync as jest.Mock).mockReturnValue(true);
  expect(getPath('uploaded')).toMatch('tmp/uploaded');
});

test('getPath should return tmp directory file path', () => {
  (fs.existsSync as jest.Mock).mockReturnValue(true);
  expect(getPath('uploaded', 'hello.pdf')).toMatch('tmp/uploaded/hello.pdf');
});

test('getPath should make tmp dir if it does not exist', () => {
  (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
  getPath('uploaded');
  expect(fs.mkdirSync).toHaveBeenCalledWith('tmp');
});

test('getPath should make tmp/dir if it does not exist', () => {
  (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
  (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
  getPath('uploaded');
  expect(fs.mkdirSync).toHaveBeenCalledWith('tmp/uploaded');
});
