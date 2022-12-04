import PdfMetadata from "./pdfMetadata";
import { capitalizeFirstLetter } from "./helperFunctions";
const pdfLib = require('pdf-to-text');

// Placeholder until there's a front-end where this param can be input
const pdfFilePath = "../dhl-handbuch-funktion-retoure-v7-122019.pdf"

// Bad file error test
// const pdfFilePath = "2f";

// Getting the .pdf metadata out of the callback function
function getPdfMetadata(pdfLib: any, pdfFilePath: string): Promise<PdfMetadata> {
  return new Promise((resolve, reject) => {
    const metadata:PdfMetadata = pdfLib.info(pdfFilePath, (err: string, results: PdfMetadata) => {
      if (err) {
        console.log(capitalizeFirstLetter(err))
        reject(capitalizeFirstLetter(err))
      }
      resolve(results)
    });
    return metadata;
  });
}

export const pdfMetadata = async() => { 
    const metadata = await getPdfMetadata(pdfLib, pdfFilePath);
    return metadata;
}