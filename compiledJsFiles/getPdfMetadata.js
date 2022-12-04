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
exports.pdfMetadata = void 0;
const helperFunctions_1 = require("./helperFunctions");
const lib = (0, helperFunctions_1.pdfLib)();
// Placeholder until there's a front-end where this param can be input
const pdfFilePath = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";
// Bad file error test
// const pdfPath = "2f";
// Getting the metadata out of the callback function
function getPdfMetadata(pdfLib, pdfFilePath) {
    return new Promise((resolve, reject) => {
        const metadata = pdfLib.info(pdfFilePath, (err, results) => {
            if (err) {
                console.log((0, helperFunctions_1.capitalizeFirstLetter)(err));
                reject("File could not be found");
            }
            resolve(results);
        });
        return metadata;
    });
}
const pdfMetadata = () => __awaiter(void 0, void 0, void 0, function* () {
    const metadata = yield getPdfMetadata(lib, pdfFilePath);
    return metadata;
});
exports.pdfMetadata = pdfMetadata;
