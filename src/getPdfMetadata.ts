import PdfMetadata from "./pdfMetadata";

export async function getPdfMetadata() {
        const pdfUtil = require('pdf-to-text');
        const pdf_path = "/Users/lisastedmanfalls/Desktop/translate_node_project/dhl-handbuch-funktion-retoure-v7-122019.pdf";
        const data = pdfUtil.info(
            pdf_path, 
            function(err: any, results: PdfMetadata) {
                if (err) throw(err);
                console.log(results);
                return results;
        });
        console.log(`not here ${data}`)
        return await data;
    };