import { metadata } from "./getPdfMetadata";

async function retrieveResults() { 
    const data = await metadata();
    console.log(data);
}

retrieveResults();