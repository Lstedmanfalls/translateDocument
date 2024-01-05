# Backstory:

A colleague at work needed help getting pertinent information out of a 23 page .pdf manual that was written in German.

To translate the manual into English, he was manually copying and pasting blocks of text from it into Google Translate web text input box. Google translate only allows a maximum of 3900 characters at once, so translating the entire manual would've taken quite a bit of time and effort.

# Functionality:

This app will allow a user to upload a document written in one language and download a translated version of it in another language

# Running Locally:

1. Create a Google Cloud project linked to a service account that has access to Cloud Translation API
- See https://cloud.google.com/translate/docs/setup for more info
2. Set PROJECT_ID env variable in .env file
- `PROJECT_ID="{project_id}"`
3. Set auth env variable in console to point to locally stored service account pem. Will need to set for each new terminal session.
- `export GOOGLE_APPLICATION_CREDENTIALS="{path_to_key}"`
4. Install this project's dependencies
- `npm i`
5. Run the express server locally
- `npx tsx app.ts`

# TO DO Still:
- Integrate a db to store the pdfs and translations so I can work with them without having to make new API calls (i.e., prevent GCP charges)
- Add ability to translate from a word document as well as pdf
- Add a frontend with ability to upload a document, display the translated pages, and download the exported word doc translation
- Add unit tests
