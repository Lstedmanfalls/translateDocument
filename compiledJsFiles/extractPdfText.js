"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfText = void 0;
const getPdfPagesCount_1 = require("./getPdfPagesCount");
const helperFunctions_1 = require("./helperFunctions");
const pdfLib = require('pdf-to-text');
function getPagesRange(pageFrom, pageTo) {
    return __awaiter(this, void 0, void 0, function* () {
        const pagesCount = yield (0, getPdfPagesCount_1.getPdfPagesCount)();
        // console.log("***** pages count = " + pagesCount)
        const inputFrom = pageFrom !== undefined ? pageFrom : 1;
        const from = inputFrom < 1 ? inputFrom : 1;
        const inputTo = pageTo !== undefined ? pageTo : pagesCount;
        const to = inputTo < pagesCount ? inputTo : pagesCount;
        // console.log("**** Pages to get: " + from + "-" + to)
        return { from: from, to: to };
    });
}
function getPdfText(pdfLib, pdfFilePath, pagesRange) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const pdfText = pdfLib.pdfToText(pdfFilePath, pagesRange, (err, pdfText) => {
                if (err) {
                    console.log((0, helperFunctions_1.capitalizeFirstLetter)(err));
                    reject("Error extracting text from .pdf");
                }
                resolve(pdfText);
            });
            return pdfText;
        });
    });
}
const pdfText = () => __awaiter(void 0, void 0, void 0, function* () {
    // Placeholder until there's a front-end where this param can be input
    const pdfFilePath = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";
    // Placeholder until there's a front-end where these params can be input
    const inputPageFrom = 1;
    const inputPageTo = 3;
    const pagesRange = yield getPagesRange(inputPageFrom, inputPageTo);
    const text = yield getPdfText(pdfLib, pdfFilePath, pagesRange);
    // Snip the text if it's over translation limit (3900 chars)
    let textToTranslate = text;
    const textLength = text.length;
    if (textLength > 2000) {
        textToTranslate = text.substring(0, 2000);
    }
    // Translation doesn't work properly if words are all uppercase
    textToTranslate = textToTranslate.toLowerCase();
    console.log(textToTranslate);
    return textToTranslate;
});
exports.pdfText = pdfText;
(0, exports.pdfText)();
