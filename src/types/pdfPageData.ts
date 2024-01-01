import * as pdfjsDist from 'pdfjs-dist';

export interface PdfPage {
  pageNumber: number
  page: pdfjsDist.PDFPageProxy
}

export interface PdfPageText {
  pageNumber: number
  pageText: string
}
