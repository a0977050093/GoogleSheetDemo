const { google } = require('googleapis');
const fs = require('fs');

// 加載憑證
const credentials = JSON.parse(fs.readFileSync('credentials.json'));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function accessSpreadsheet() {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = 'your-spreadsheet-id'; // 替換為試算表 ID
    const range = 'Sheet1!A1:B2'; // 要讀取的範圍

    // 讀取試算表資料
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    console.log('Data:', response.data.values);

    // 寫入試算表資料
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A3',
        valueInputOption: 'RAW',
        requestBody: {
            values: [['Hello from GitHub']],
        },
    });

    console.log('Data written to spreadsheet!');
}

accessSpreadsheet().catch(console.error);