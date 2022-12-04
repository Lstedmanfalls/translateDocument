import { metadata } from "./getPdfMetadata";
import PdfMetadata from "./pdfMetadata";

async function retrieveResults():Promise<PdfMetadata | number> { 
    const pdfMetadata = await metadata();
    if (!pdfMetadata){
        console.log("File could not be read")
        return 400;
    }
    console.log("Obtained file metadata")
    return pdfMetadata;
}

const results = retrieveResults();