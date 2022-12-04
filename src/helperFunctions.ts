export function capitalizeFirstLetter(string: string){
    return string[0].toUpperCase() + string.slice(1);
}

export function pdfUtil() {
    return require('pdf-to-text');
}
