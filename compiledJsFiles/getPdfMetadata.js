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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
const helperFunctions_1 = __importDefault(require("./helperFunctions"));
// Placeholder until there's a front-end where this param can be input
const pdf_path = "../dhl-handbuch-funktion-retoure-v7-122019.pdf";
// Getting the data out of the pdfUtil callback function
function getPdfMetadata(pdf_path) {
    return new Promise((resolve) => {
        const pdfUtil = require('pdf-to-text');
        const results = pdfUtil.info(pdf_path, (err, results) => {
            if (err) {
                console.log((0, helperFunctions_1.default)(err));
            }
            resolve(results);
        });
        return results;
    });
}
function metadata() {
    return __awaiter(this, void 0, void 0, function* () {
        let results = yield getPdfMetadata(pdf_path);
        return results;
    });
}
exports.metadata = metadata;
