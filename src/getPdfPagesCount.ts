import { PdfMetadata } from "./types";
import { pdfMetadata } from "./getPdfMetadata";

// Getting the .pdf total pages count
export const getPdfPagesCount = async () => {
   const metadata: PdfMetadata = await pdfMetadata();
   const pageCount = metadata.pages;
   return pageCount;
};
