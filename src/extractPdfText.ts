import { getPages } from "./getPdfPages";

const pagesCheck = async() => { 
    const pagesResults = await getPages();
    try {
        pagesResults
        return pagesResults;
    }
    catch{
        const err = ("File could not be read")
        throw new Error(err);
    }
}

const gotPages = async() => {
    const pages = await pagesCheck();
    if (pages){
        console.log("Obtained file metadata")
        console.log(pages)
    }
}

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