import { PdfPageText } from '../types/pdfPageData';

// Here do any text data transformations that need to occur prior to translation

export const transformText = (rawTextPages: PdfPageText[]): PdfPageText[] => {
  // Translation doesn't work properly for words that are allcaps
  const lowercasedTextPages = rawTextPages.map((page) => {
    let { pageText } = page;
    pageText = pageText.toLowerCase();
    const { pageNumber } = page;
    return { pageNumber, pageText };
  });
  return lowercasedTextPages;
};
