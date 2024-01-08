import { getNewFileName } from '../getNewFileName';

Date.now = jest.fn(() => 13);

test('getNewFileName creates correct file name when no ext passed', () => {
  expect(getNewFileName('hello.pdf')).toMatch('hello_13.pdf');
});

test('getNewFileName creates correct file name with new ext passed', () => {
  expect(getNewFileName('hello.pdf', 'docx')).toMatch('hello_13.docx');
});
