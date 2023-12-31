import PdfMetadata from './types/pdfMetadata';
const pdfLib = require('pdf-to-text');

// Placeholder until there's a front-end pulling this info can be input
const pdfFilePath = './dhl-handbuch-funktion-retoure-v7-122019.pdf';
const start = 1;
const end = 3;

const getPdfMetadata = async (pdfFilePath: string): Promise<PdfMetadata> => {
  return new Promise((resolve) => {
    const metadata: PdfMetadata = pdfLib.info(pdfFilePath, (err: string, results: PdfMetadata) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
      resolve(results);
    });
    return metadata;
  });
};

const getPdfPagesCount = async (): Promise<number> => {
  const metadata = await getPdfMetadata(pdfFilePath);
  const pageCount = metadata.pages;
  return pageCount;
};

const getSelectedPages = async (start = 1, endPage?: number) => {
  const pdfPagesCount = await getPdfPagesCount();
  const end = endPage ? endPage : pdfPagesCount;
  return { start, end };
};

// Extract the text from the .pdf
const getPdfText = async (pdfFilePath: string, selectedPages: { start: number, end: number }): Promise<string> => {
  return new Promise((resolve) => {
    const pdfText: string = pdfLib.pdfToText(pdfFilePath, selectedPages, (err: string, pdfText: string) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
      resolve(pdfText);
    });
    return pdfText;
  });
};

export const pdfText = async () => {
  const pages = await getSelectedPages(start, end);
  const rawText = await getPdfText(pdfFilePath, pages);
  return rawText;
};
