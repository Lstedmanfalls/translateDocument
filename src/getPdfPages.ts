import PdfMetadata from "./pdfMetadata";
import { capitalizeFirstLetter, pdfUtil } from "./helperFunctions";

const pdfLib = pdfUtil()

// Placeholder until there's a front-end where this param can be input
const pdfPath = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";

// Bad file error test
// const pdfPath = "2f";

// Getting the metadata out of the pdfUtil callback function and returning the # of pages

function getPdfMetadata(pdfPath:string, pdfUtil:any):Promise<PdfMetadata | undefined> {
  return new Promise((resolve) => {
    const metadata:PdfMetadata = pdfUtil.info(pdfPath, (err: string, results: PdfMetadata) => {
      if (err) {
        console.log(capitalizeFirstLetter(err))
      }
      resolve(results)
    });
    return metadata;
  });
}

export async function getPages():Promise<number | undefined> {
    const metadata = await getPdfMetadata(pdfPath, pdfLib);
    const pages = metadata?.pages;
    return pages;
}