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
const getPdfMetadata_1 = require("./getPdfMetadata");
function retrieveResults() {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfMetadata = yield (0, getPdfMetadata_1.metadata)();
        if (!pdfMetadata) {
            console.log("File could not be read");
            return 400;
        }
        console.log("Obtained file metadata");
        return pdfMetadata;
    });
}
const results = retrieveResults();
