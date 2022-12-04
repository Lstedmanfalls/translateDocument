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
exports.getPdfPagesCount = void 0;
const getPdfMetadata_1 = require("./getPdfMetadata");
// Getting the .pdf pages count
function getPdfPagesCount() {
    return __awaiter(this, void 0, void 0, function* () {
        const metadata = yield (0, getPdfMetadata_1.pdfMetadata)();
        const pageCount = metadata.pages;
        return pageCount;
    });
}
exports.getPdfPagesCount = getPdfPagesCount;
