import { parseFileNameExt } from './parseFileNameExt';

test('parseFileNameExt splits file name from extension', () => {
  const originalFileName = 'hello.pdf';
  expect(JSON.stringify(parseFileNameExt(originalFileName))).toMatch(JSON.stringify({ fileName: 'hello', ext: 'pdf' }));
});
