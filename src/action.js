const core = require('@actions/core');
const fs = require('fs');
const {google} = require('googleapis');

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const CLIENT_ID = core.getInput('GOOGLE_CLIENT_ID');
const CLIENT_SECRET = core.getInput('GOOGLE_CLIENT_SECRET');
const REFRESH_TOKEN = core.getInput('GOOGLE_REFRESH_TOKEN');
const SHEET_ID = core.getInput('GOOGLE_SHEET_ID');
const INPUT_FILE_PATH = core.getInput('INPUT_FILE');
const MAX_SHEET_ROWS = 50000000;

let inputFile;
let INPUT_ROWS;

try {
    inputFile = fs.readFileSync(INPUT_FILE_PATH);

    INPUT_ROWS = JSON.parse(inputFile.toString()).rows;
} catch (e) {
    core.setFailed(`Failed To Read File, ${e}`);
}


const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sheets = google.sheets({
    version: 'v4',
    auth: oauth2Client,
});

let lastSheetRow;

function getSheetEndRow() {
    sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `A1:A${MAX_SHEET_ROWS}`,
    }, (error, res) => {
        if (error) {
            core.setFailed(`Failed to Read Sheet ${error}`);
            return;
        }

        lastSheetRow = (res.data?.values.length || 0) + 1;

        writeSheet(INPUT_ROWS)
    });
}

function writeSheet(columns) {
    const resource = {
        values: columns,
    };
    sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `A${lastSheetRow}`,
        valueInputOption: 'RAW',
        resource,
    }, (err, result) => {
        if (err) {
            core.setFailed(`Failed to Write in Sheet ${err}`);
            return;
        }

        console.log('cells updated');
    });
}

getSheetEndRow();

