import { getPdfPagesCount } from "./getPdfPagesCount";
import { capitalizeFirstLetter } from "./helperFunctions";
import { join } from "path";
//@ts-expect-error no type declarations for this module
import pdfLib from "pdf-to-text";
import { PdfLib } from "./types";

// Get the user's desired pages range to translate, with a few validity checks
const getPagesRange = async (pageFrom = 1, pageTo?: number) => {
   const pagesCount = await getPdfPagesCount();

   const from: number = pageFrom < 1 ? 1 : pageFrom;

   const inputTo = pageTo ?? pagesCount;
   const to: number = inputTo < pagesCount ? inputTo : pagesCount;

   return { from, to };
};

// Extract the text from the .pdf
const getPdfText = (
   pdfLib: PdfLib,
   pdfFilePath: string,
   pagesRange: { from: number; to: number }
): Promise<string> => {
   return new Promise((resolve, reject) => {
      pdfLib.pdfToText(
         pdfFilePath,
         pagesRange,
         (err: string, pdfText: string) => {
            if (err) {
               console.log(capitalizeFirstLetter(err));
               reject(capitalizeFirstLetter(err));
            }
            resolve(pdfText);
         }
      );
   });
};

export const pdfText = async () => {
   // Placeholder until there's a front-end where this param can be input
   const pdfFilePath = join(
      "..",
      "/dhl-handbuch-funktion-retoure-v7-122019.pdf"
   );

   // Bad file error test
   // const pdfFilePath = "2f";

   // Placeholder until there's a front-end where these params can be input
   const inputPageFrom = 1;
   const inputPageTo = 3;

   const pagesRange = await getPagesRange(inputPageFrom, inputPageTo);
   const rawText = await getPdfText(pdfLib, pdfFilePath, pagesRange);

   return rawText;
};
