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
exports.getPdfMetadata = void 0;
function getPdfMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfUtil = require('pdf-to-text');
        const pdf_path = "/Users/lisastedmanfalls/Desktop/translate_node_project/dhl-handbuch-funktion-retoure-v7-122019.pdf";
        const data = pdfUtil.info(pdf_path, function (err, results) {
            if (err)
                throw (err);
            console.log(results);
            return results;
        });
        console.log(`not here ${data}`);
        return yield data;
    });
}
exports.getPdfMetadata = getPdfMetadata;
;
