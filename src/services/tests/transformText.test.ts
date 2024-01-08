import { transformText } from '../transformText';

test('transformText should make all text lowercase', () => {
  const mockPages = [
    {
      pageNumber: 1,
      pageText: 'TEXT ONE',
    },
    {
      pageNumber: 2,
      pageText: 'TEXT TWO',
    },
  ];

  const expected = [
    {
      pageNumber: 1,
      pageText: 'text one',
    },
    {
      pageNumber: 2,
      pageText: 'text two',
    },
  ];

  expect(JSON.stringify(transformText(mockPages))).toMatch(JSON.stringify(expected));
});
