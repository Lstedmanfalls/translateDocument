import PdfMetadata from "./pdfMetadata";
import { pdfMetadata } from "./getPdfMetadata";

// Getting the .pdf pages count
export async function getPdfPagesCount(): Promise<number> {  
  const metadata: PdfMetadata = await pdfMetadata();
  const pageCount = metadata.pages;
  return pageCount;
}