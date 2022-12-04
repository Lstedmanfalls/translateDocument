"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfUtil = exports.capitalizeFirstLetter = void 0;
function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function pdfUtil() {
    return require('pdf-to-text');
}
exports.pdfUtil = pdfUtil;
