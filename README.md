# Context:

A colleague at work needed help getting pertinent information out of a 23 page .pdf manual that was written in German.

To translate the manual into English, he was manually copying and pasting blocks of text from it into Google Translate web text input box. Google translate only allows a maximum of 3900 characters at once, so translating the entire manual would've taken quite a bit of time and effort.

This app allows a user to upload a .pdf or text file written in another language and to download a Word document version of it translated into English (via Google's Translation API).

# Progress Timeline:

12/3/22 - Day 1

-  Started bulding app backend in typeScript
-  Using [pdf-to-text](https://www.npmjs.com/package/pdf-to-text) library to extract .pdf metadata, including document page count

12/4/22 - Extract text from .pdf

-  Added functionality to extract text from the .pdf based on page range input
-  Tested text character limits and fomatting via Google Translate web input
