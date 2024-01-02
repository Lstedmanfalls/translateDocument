# Backstory:

A colleague at work needed help getting pertinent information out of a 23 page .pdf manual that was written in German.

To translate the manual into English, he was manually copying and pasting blocks of text from it into Google Translate web text input box. Google translate only allows a maximum of 3900 characters at once, so translating the entire manual would've taken quite a bit of time and effort.

# Functionality:

This app allows a user to upload a .pdf or text file written in another language and to download a Word document version of it translated into English (via Google's Translation API).

# Running Locally:

1. Create a Google Cloud project linked to a service account that has access to Cloud Translation API
- See https://cloud.google.com/translate/docs/setup for more info
2. Set PROJECT_ID env variable in .env file
- `PROJECT_ID="{project_id}"`
3. Set auth env variable in console to point to locally stored service account pem. Will need to set for each new terminal session.
- `export GOOGLE_APPLICATION_CREDENTIALS="{path_to_key}"`
4. Install this project's dependencies
- `npm i`
5. Run the main typescript file locally
- `npx tsx src/translateText.ts`

# TO DO Still:
- Integraete a db to store the pdfs and translations so I can work with them without having to make new API calls (i.e., prevent GCP charges)
- Add a frontend with ability to upload a pdf, display the translated pages, and download a word doc version of it
- Add unit tests