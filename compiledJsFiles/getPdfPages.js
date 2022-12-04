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
exports.getPages = void 0;
const helperFunctions_1 = require("./helperFunctions");
const pdfLib = (0, helperFunctions_1.pdfUtil)();
// Placeholder until there's a front-end where this param can be input
// const pdfPath = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";
// Bad file error test
const pdfPath = "2f";
// Getting the metadata out of the pdfUtil callback function and returning the # of pages
function getPdfMetadata(pdf_path, pdfUtil) {
    return new Promise((resolve) => {
        const metadata = pdfUtil.info(pdf_path, (err, results) => {
            if (err) {
                console.log((0, helperFunctions_1.capitalizeFirstLetter)(err));
            }
            resolve(results);
        });
        return metadata;
    });
}
function getPages() {
    return __awaiter(this, void 0, void 0, function* () {
        const metadata = yield getPdfMetadata(pdfPath, pdfLib);
        const pages = metadata === null || metadata === void 0 ? void 0 : metadata.pages;
        return pages;
    });
}
exports.getPages = getPages;
