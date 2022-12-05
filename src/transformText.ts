import { pdfText } from "./extractPdfText"


// Any text data transformations that need to occur prior to translation
export const transformText = async() => {
    const rawPdfText = await pdfText();

    let transformedPdfText: string = rawPdfText
    
    // Translation doesn't work properly if words are all uppercase
    transformedPdfText = rawPdfText.toLowerCase()
    // ^^ although this makes everything lowercase, is there a better way?

    console.log(transformedPdfText)
    return transformedPdfText;
};

transformText();