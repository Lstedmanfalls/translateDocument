import { extractPdfText } from './extractPdfText';
import { transformText } from './transformText';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { PdfPageText } from './types/pdfPageData';
import { TranslatedText } from './types/translatedTextData';

const translateText = async (textPages: PdfPageText[]): Promise<{ pageNumber: number, translation: string }[]> => {
  const projectId = process.env.PROJECT_ID;
  const targetLanguage = 'en';
  const translator = new Translate({ projectId });

  const translatedText = textPages.map(async (textObject) => {
    const pageNumber = textObject.pageNumber;
    const text = textObject.pageText;
    const [translation] = await translator.translate(text, targetLanguage);
    return { pageNumber, translation };
  });
  return Promise.all(translatedText);
};

const getTranslation = async (filepath: string, start: number = 1, end?: number): Promise<TranslatedText[]> => {
  const rawText = await extractPdfText(filepath, start, end);
  const transformedText = transformText(rawText);
  const translatedText = await translateText(transformedText);
  console.log(translatedText);
  return translatedText;
};

// Pdf file is stored at root dir for now
// Provide start, or start and end, to get specific pages. Pass nothing to get entire document
getTranslation('./dhl-handbuch-funktion-retoure-v7-122019.pdf', 1, 1);
