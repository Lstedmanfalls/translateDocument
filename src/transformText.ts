import { PdfPageText } from './types/pdfPageData';

// Here do any text data transformations that need to occur prior to translation

export const transformText = (rawTextPages: PdfPageText[]): PdfPageText[] => {
  // Translation doesn't work properly if words are all uppercase, so am lowercasing everything for now
  const lowercasedTextPages = rawTextPages.map((page) => {
    const pageText = page.pageText.toLowerCase();
    const pageNumber = page.pageNumber;
    return { pageNumber, pageText };
  });
  return lowercasedTextPages;
};
