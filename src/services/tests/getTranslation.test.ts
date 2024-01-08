import { Translate } from '@google-cloud/translate/build/src/v2';
import { getTranslation } from '../getTranslation';

jest.mock('../extractPdfText', () => ({
  extractPdfText: jest.fn(() => Promise.all([
    {
      pageNumber: 1,
      pageText: 'HALLO',
    },
    {
      pageNumber: 2,
      pageText: 'HALLO ZWEI',
    },
  ],
  ),
  ) }
),
);

test('getTranslation should return translated text array', async () => {
  process.env.PROJECT_ID = 'test';
  const projectId = process.env.PROJECT_ID;

  jest.spyOn(Translate.prototype, 'translate').mockImplementationOnce(() => {
    return ['hello'];
  });
  jest.spyOn(Translate.prototype, 'translate').mockImplementationOnce(() => {
    return ['hello two'];
  });
  const expected = [
    {
      pageNumber: 1,
      translation: 'hello',
    },
    {
      pageNumber: 2,
      translation: 'hello two',
    },
  ];
  new Translate({ projectId });
  const result = await getTranslation('hello.pdf', 'en');
  expect(JSON.stringify(result)).toMatch(JSON.stringify(expected));
});

test('getTranslation should throw error if no PROJECT_ID env variable', () => {
  delete process.env.PROJECT_ID;
  expect(async () => await getTranslation('hello.pdf', 'en')).rejects.toThrow('PROJECT_ID env variable not set');
});
