import { getPath } from '../helpers/getPath';

export const exportTranslationDoc = () => {
  const root = getPath('translated');
  const options = {
    root,
  };
  return { options };
};
