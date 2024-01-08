import { getPath } from '../../helpers/getPath';
import { exportTranslationDoc } from '../exportTranslationDoc';

jest.mock('../../helpers/getPath');

test('exportTranslationDoc should return correct options object', () => {
  (getPath as jest.Mock).mockReturnValue('tmp/translated');
  const expected = {
    options: {
      root: 'tmp/translated',
    },
  };
  expect(JSON.stringify(exportTranslationDoc())).toMatch(JSON.stringify(expected));
});
