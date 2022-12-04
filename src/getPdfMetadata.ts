import PdfMetadata from "./pdfMetadata";
import capitalizeFirstLetter from "./helperFunctions";

// Placeholder until there's a front-end where this param can be input
const pdf_path = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";

// Getting the data out of the pdfUtil callback function
function getPdfMetadata(pdf_path:string):Promise<PdfMetadata | undefined> {
  return new Promise((resolve) => {
    
    const pdfUtil = require('pdf-to-text');

    const results:PdfMetadata = pdfUtil.info(pdf_path, (err: string, results: PdfMetadata) => {
      if (err) {
        console.log(capitalizeFirstLetter(err))
      }
      resolve(results)
    });
    return results;
  });
}

export async function metadata():Promise<PdfMetadata | undefined> {
    let results = await getPdfMetadata(pdf_path);
    return results;
}