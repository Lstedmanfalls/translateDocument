import { getPdfPagesCount } from "./getPdfPagesCount";
import { capitalizeFirstLetter, pdfLib } from "./helperFunctions";

async function getPagesRange(pageFrom?: number, pageTo?: number) {
    const pagesCount = await getPdfPagesCount();
    // console.log("***** pages count = " + pagesCount)

    const inputFrom: number = pageFrom !== undefined ? pageFrom : 1;
    const from: number = inputFrom !< 1 ? inputFrom : 1;

    const inputTo: number = pageTo !== undefined ? pageTo : pagesCount;
    const to: number = inputTo !< pagesCount ? inputTo: pagesCount;
    // console.log("**** Pages to get: " + from + "-" + to)

    return {from: from, to: to}
}

async function getPdfText(pdfLib:any, pdfFilePath:string, pagesRange: {from: number, to: number}):Promise<string> {
    return new Promise((resolve, reject) => {
        const pdfText:string = pdfLib.pdfToText(pdfFilePath, pagesRange, (err: string, pdfText: string) => {
        if (err) {
            console.log(capitalizeFirstLetter(err))
            reject("Error extracting text from .pdf")
        }
        resolve(pdfText)
        });
        return pdfText;
    });
}

export const pdfText = async() => {

    const lib = pdfLib()

    // Placeholder until there's a front-end where this param can be input
    const pdfFilePath = "../dhl-handbuch-funktion-retoure-v7-122019.pdf"

    // Placeholder until there's a front-end where these params can be input
    const inputPageFrom: number = 1
    const inputPageTo: number = 2

    const pagesRange = await getPagesRange(inputPageFrom, inputPageTo);
    const text = await getPdfText(lib, pdfFilePath, pagesRange);

    // Snip the text if it's over translation limit (3900 chars)
    let textToTranslate: string = text
    const textLength = text.length
    if (textLength > 2000) {
        textToTranslate = text.substring(0, 2000)
    }
    
    // Translation doesn't work properly if words are all uppercase
    textToTranslate = textToTranslate.toLowerCase()
    console.log(textToTranslate.length)
    console.log(textToTranslate)
    return textToTranslate;
}

pdfText();