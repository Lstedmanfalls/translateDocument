import { extractPdfText } from './extractPdfText';
import { transformText } from './transformText';

const getTextFromPdf = async (start: number = 1, end?: number) => {
  const rawTextPages = await extractPdfText(start, end);
  const transformedTextPages = transformText(rawTextPages);
  console.log(transformedTextPages);
  return transformedTextPages;
};

// Provide start, or start and end, to get specific pages. Pass nothing to get entire document
getTextFromPdf();
