import { getPdfPagesCount } from "./getPdfPagesCount";
import { capitalizeFirstLetter } from "./helperFunctions";
const pdfLib = require('pdf-to-text');
// figure out how to deal with this import vs require thing
// tried modifying tsconfig.json target and module to es2022 and moduleResolution uncomment
// ^ but didn't work, kept saying module couldn't be found, etc.

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

async function getPdfText(pdfLib: any, pdfFilePath: string, pagesRange: {from: number, to: number}): Promise<string> {
    return new Promise((resolve, reject) => {
        const pdfText: string = pdfLib.pdfToText(pdfFilePath, pagesRange, (err: string, pdfText: string) => {
        if (err) {
            console.log(capitalizeFirstLetter(err))
            reject(capitalizeFirstLetter(err))
        }
        resolve(pdfText)
        });
        return pdfText;
    });
}

export const pdfText = async() => {

    // Placeholder until there's a front-end where this param can be input
    const pdfFilePath = "../dhl-handbuch-funktion-retoure-v7-122019.pdf"

    // Bad file error test
    // const pdfFilePath = "2f";

    // Placeholder until there's a front-end where these params can be input
    const inputPageFrom: number = 1
    const inputPageTo: number = 3

    const pagesRange = await getPagesRange(inputPageFrom, inputPageTo);
    const text = await getPdfText(pdfLib, pdfFilePath, pagesRange);

    // ***************************************************************************
    // This code will move to a new transformText file

    let textToTranslate: string = text
    
    // Translation doesn't work properly if words are all uppercase
    textToTranslate = text.toLowerCase()

    // ***************************************************************************
    // This code will move to a new translateText file

    // Snip the text if it's over translation limit (limit is 3900 chars, 2000 suggested)
    const textLength = text.length
    if (textLength > 2000) {
        textToTranslate = text.substring(0, 2000)
    }

    // ^^^ Need to add to / modify this logic when calling translate API to call again x times for remaining text over 2000, and then combine all translated text when translation calls done
    
    console.log(textToTranslate)
    return textToTranslate;
}

pdfText();