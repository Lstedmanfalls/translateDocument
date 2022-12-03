import { resourceLimits } from "worker_threads";
import PdfMetadata from "./pdfMetadata";

function getPdfMetadata() {
  return new Promise((resolve, reject) => {
    const pdfUtil = require('pdf-to-text');
    const pdf_path = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";

    const results = pdfUtil.info(pdf_path, (err: any, results: PdfMetadata) => {
      if (err) reject(err)
      resolve(results)
    });
    return results;
  });
}

export async function metadata() {
    const results = await getPdfMetadata();
    return results;
}