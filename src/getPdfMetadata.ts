import PdfMetadata from "./pdfMetadata";

// Placeholder until there's a front-end where this param can be input
const pdf_path = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";

// Getting the data out of the pdfUtil callback function
function getPdfMetadata(pdf_path:string):Promise<PdfMetadata> {
  return new Promise((resolve, reject) => {
    
    const pdfUtil = require('pdf-to-text');

    const results:PdfMetadata = pdfUtil.info(pdf_path, (err: any, results: PdfMetadata) => {
      if (err) reject(err)
      resolve(results)
    });
    return results;
  });
}

export async function metadata() {
    const results = await getPdfMetadata(pdf_path);
    return results;
}