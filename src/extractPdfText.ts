import * as pdfjsDist from 'pdfjs-dist';
import { PdfPage, PdfPageText } from './types/pdfPageData';

const getPdf = (): Promise<pdfjsDist.PDFDocumentProxy> => {
  const pdfFilePath = './dhl-handbuch-funktion-retoure-v7-122019.pdf';
  const pdf = pdfjsDist.getDocument({ url: pdfFilePath, useSystemFonts: true }).promise;
  return pdf;
};

const getSelectedPages = async (pdf: pdfjsDist.PDFDocumentProxy, start: number, end: number): Promise<PdfPage[]> => {
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

export const extractPdfText = async (start: number = 1, end?: number): Promise<PdfPageText[]> => {
  const pdf = await getPdf();
  const endPage = end ? end : pdf.numPages;
  const pages = await getSelectedPages(pdf, start, endPage);
  const pagesText = await getPagesText(pages);
  return pagesText;
};
