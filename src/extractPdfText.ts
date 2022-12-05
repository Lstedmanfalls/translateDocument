import { getPdfPagesCount } from "./getPdfPagesCount";
import { capitalizeFirstLetter } from "./helperFunctions";
const pdfLib = require('pdf-to-text');
// figure out how to deal with this import vs require thing
// tried modifying tsconfig.json target and module to es2022 and moduleResolution uncomment
// ^ but didn't work, kept saying module couldn't be found, etc.

// Get the user's desired pages ranges range to translate, or pick all pages if not selected
async function getPagesRange(pageFrom?: number, pageTo?: number) {
    const pagesCount = await getPdfPagesCount();

    const inputFrom: number = pageFrom !== undefined ? pageFrom : 1;
    const from: number = inputFrom !< 1 ? inputFrom : 1;

    const inputTo: number = pageTo !== undefined ? pageTo : pagesCount;
    const to: number = inputTo !< pagesCount ? inputTo: pagesCount;

    return {from: from, to: to}
}

// Extract the text from the .pdf
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

    return text;
}