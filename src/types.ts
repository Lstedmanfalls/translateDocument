export interface PdfMetadata {
   title: string;
   subject: string;
   keywords: string;
   author: string;
   creator: number;
   producer: number;
   creationdate: number;
   moddate: number;
   tagged: string;
   form: string;
   pages: number;
   encrypted: string;
   page_size: string;
   mediabox: string;
   cropbox: string;
   bleedbox: string;
   trimbox: string;
   artbox: string;
   file_size: string;
   optimized: string;
   pdf_version: number;
}

export interface PdfLib {
   info: (...args: unknown[]) => PdfMetadata;
   pdfToText: (...args: unknown[]) => string;
}
