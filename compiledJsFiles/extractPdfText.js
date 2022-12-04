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
const getPdfPages_1 = require("./getPdfPages");
const pagesCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    const pagesResults = yield (0, getPdfPages_1.getPages)();
    try {
        pagesResults;
        return pagesResults;
    }
    catch (_a) {
        const err = ("File could not be read");
        throw new Error(err);
    }
});
const gotPages = () => __awaiter(void 0, void 0, void 0, function* () {
    const pages = yield pagesCheck();
    if (pages) {
        console.log("Obtained file metadata");
        console.log(pages);
    }
});
gotPages();
// var pdfUtil = require('pdf-to-text');
// var pdf_path = "absolute_path/to/pdf_file.pdf";
// //option to extract text from page 0 to 10
// var option = {from: 0, to: 10};
// pdfUtil.pdfToText(upload.path, option, function(err, data) {
//   if (err) throw(err);
//   console.log(data); //print text    
// });
// //Omit option to extract all text from the pdf file
// pdfUtil.pdfToText(upload.path, function(err, data) {
//   if (err) throw(err);
//   console.log(data); //print all text    
// });
