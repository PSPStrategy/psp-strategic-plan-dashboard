// This is a Vercel Serverless Function (API Route)
// It runs on Vercel's servers, not in the user's browser.
// It securely fetches data from Google Sheets using the Service Account credentials.

import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Your Google Sheet ID - this is the same ID used in App.js
const SPREADSHEET_ID = '1Ei9pG3fdEjL2-2dD2LC6ywpvqS0yeZvHEMK2_ybRKDw';

// Helper function to parse Google Sheet data into the desired initiative structure
// This function is duplicated here because the API route needs it to process the raw sheet data
// before sending it to the client.
const parseSheetData = (values) => {
  if (!values || values.length < 2) {
    console.warn("No data or only header row found in Google Sheet.");
    return [];
  }

  const initiatives = [];

  // Skip header row (values[0]) and start from the first data row (values[1])
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const initiative = {};

    // Map sheet columns to initiative properties based on the CSV structure
    // Ensure these indices match your Google Sheet's column order
    initiative.priority = row[0] || 'N/A'; // Column A
    initiative.strategicGoal = row[1] || 'N/A'; // Column B
    initiative.name = row[2] || 'N/A'; // Column C
    initiative.timeline = row[3] || 'N/A'; // Column D
    initiative.fullTargets = row[4] || 'N/A'; // Column E (Full Targets)
    initiative.owner = row[5] || 'TBD'; // Column F
    initiative.status = row[6] || 'On Track'; // Column G

    // Parse Progress Updates (stored as JSON string in the sheet)
    try {
      // Ensure row[7] exists before attempting to parse
      initiative.progressUpdates = row[7] ? JSON.parse(row[7]) : []; // Column H
    } catch (e) {
      console.error("Error parsing progressUpdates JSON for row", i, ":", row[7], e);
      initiative.progressUpdates = []; // Default to empty array on error
    }

    // Simulate progress for milestones (this will still be random, as sheet doesn't provide it)
    const simulatedProgress = Math.floor(Math.random() * 90) + 10; // Random progress between 10% and 99%
    initiative.milestones = [
      `Progress: ${simulatedProgress}% Complete`,
      `Key Target: ${initiative.fullTargets.length > 80 ? initiative.fullTargets.substring(0, 80) + '...' : initiative.fullTargets}`,
    ];

    initiative.id = i; // Use row index as a simple ID for React keys
    initiatives.push(initiative);
  }
  return initiatives;
};

// This is the main handler for the serverless function
export default async function handler(req, res) {
  try {
    // Retrieve credentials from Vercel Environment Variable
    // The value is a JSON string, so we need to parse it.
    const serviceAccountCredentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

    // Authenticate with Google using the service account
    const auth = new GoogleAuth({
      credentials: serviceAccountCredentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'], // Read-only scope
    });

    // Get the Google Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch data from the specified spreadsheet and range
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:H', // Adjust range if your data is in a different sheet/columns
    });

    // Parse the raw sheet data into our desired format
    const parsedData = parseSheetData(response.data.values);

    // Send the parsed data back as a JSON response to the client
    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error fetching data from Google Sheets API:', error);
    // Send an error response to the client
    res.status(500).json({ error: 'Failed to fetch data from Google Sheet API.', details: error.message });
  }
}
