"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfLib = exports.capitalizeFirstLetter = void 0;
function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function pdfLib() {
    return require('pdf-to-text');
}
exports.pdfLib = pdfLib;
