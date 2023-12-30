import { getPdfPagesCount } from "./getPdfPagesCount";
import { capitalizeFirstLetter } from './helperFunctions';
const pdfLib = require('pdf-to-text');

// Get the user's desired pages range to translate, with a few validity checks
const getPagesRange = async(pageFrom?: number, pageTo?: number) => {
  const pagesCount = await getPdfPagesCount();

  const inputFrom: number = pageFrom !== undefined ? pageFrom : 1;
  const from: number = inputFrom !< 1 ? inputFrom : 1;

  const inputTo: number = pageTo !== undefined ? pageTo : pagesCount;
  const to: number = inputTo !< pagesCount ? inputTo: pagesCount;

  return {from: from, to: to}
}

// Extract the text from the .pdf
const getPdfText = async(pdfLib: any, pdfFilePath: string, pagesRange: {from: number, to: number}): Promise<string> => {
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
  const pdfFilePath = '../dhl-handbuch-funktion-retoure-v7-122019.pdf'

  // Bad file error test
  // const pdfFilePath = "2f";

  // Placeholder until there's a front-end where these params can be input
  const inputPageFrom: number = 1
  const inputPageTo: number = 3

  const pagesRange = await getPagesRange(inputPageFrom, inputPageTo);
  const rawText = await getPdfText(pdfLib, pdfFilePath, pagesRange);

  return rawText;
}