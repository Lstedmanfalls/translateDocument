import * as pdfjsDist from 'pdfjs-dist';
import { PdfPage, PdfPageText } from './types/pdfPageData';

const getPdf = (filePath: string): Promise<pdfjsDist.PDFDocumentProxy> => {
  // For now, storing file locally
  const pdfFilePath = filePath;
  const pdf = pdfjsDist.getDocument({ url: pdfFilePath, useSystemFonts: true }).promise;
  return pdf;
};

const getPages = async (pdf: pdfjsDist.PDFDocumentProxy, start: number, end: number): Promise<PdfPage[]> => {
  const pages = [];
  for (let pageNumber = start; pageNumber <= end; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    pages.push({ pageNumber, page });
  }
  return pages;
};

const getPagesText = async (pages: { pageNumber: number, page: pdfjsDist.PDFPageProxy }[]): Promise<PdfPageText[]> => {
  const pagesText = pages.map(async (pageObject) => {
    const pageNumber = pageObject.pageNumber;
    let pageText = '';
    const items = (await pageObject.page.getTextContent()).items;
    items.forEach((item) => {
      if ('str' in item) {
        pageText += item.str;
      }
    });
    return { pageNumber, pageText };
  });
  return Promise.all(pagesText);
};

export const extractPdfText = async (filepath: string, start: number, end?: number): Promise<PdfPageText[]> => {
  const pdf = await getPdf(filepath);
  const endPage = end ?? pdf.numPages;
  const pages = await getPages(pdf, start, endPage);
  const pagesText = await getPagesText(pages);
  await pdf.cleanup();
  return pagesText;
};

extractPdfText('./dhl-handbuch-funktion-retoure-v7-122019.pdf', 1, 2);
