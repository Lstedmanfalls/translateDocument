import PdfMetadata from "./pdfMetadata";
import { pdfMetadata } from "./getPdfMetadata";

// Getting the .pdf total pages count
export const getPdfPagesCount = async (): Promise<number> => {
   const metadata: PdfMetadata = await pdfMetadata();
   const pageCount = metadata.pages;
   return pageCount;
};
