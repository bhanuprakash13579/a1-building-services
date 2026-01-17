# Deployment and Key Generation Guide

This guide covers how to generate the required Google Service Account credentials and deploy the `a1-building-services` application to Vercel.

## 1. Google Cloud Service Account Setup (For Sheets)

To allow the contact form to save data to a Google Sheet, you need a Service Account.

1.  **Go to Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2.  **Create a New Project** (or select an existing one).
3.  **Enable Google Sheets API**:
    *   Navigate to "APIs & Services" > "Library".
    *   Search for "Google Sheets API" and enable it.
4.  **Create Service Account**:
    *   Navigate to "IAM & Admin" > "Service Accounts".
    *   Click "Create Service Account".
    *   Name it (e.g., `sheets-integration`).
    *   Grant it the role **"Editor"** (or specifically Sheets Editor).
    *   Click "Done".
5.  **Generate Keys**:
    *   Click on the newly created Service Account email.
    *   Go to the "Keys" tab.
    *   Click "Add Key" > "Create new key" > **JSON**.
    *   A `.json` file will download. This contains your secrets. **KEEP IT SAFE.**

## 2. Google Sheet Setup
1.  Create a new Google Sheet at [sheets.google.com](https://sheets.google.com).
2.  Note the **Spreadsheet ID** from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit...`
3.  **Share the Sheet**: Click "Share" and paste the **Service Account Email** (found in the JSON file or Cloud Console, e.g., `sheets-integration@project-id.iam.gserviceaccount.com`). Give it "Editor" access.

## 3. Vercel Deployment

1.  **Install Vercel CLI** (Optional, for local test) or use the Web Dashboard.
2.  **Push to GitHub**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    # Add your remote
    git remote add origin <your-repo-url>
    git push -u origin main
    ```
3.  **Import to Vercel**:
    *   Go to [vercel.com](https://vercel.com) and click "Add New Project".
    *   Import your GitHub repository.
4.  **Environment Variables**:
    *   In the Vercel Project Settings, add the following Environment Variables:

    | Name | Value |
    | :--- | :--- |
    | `SPREADSHEET_ID` | The ID from step 2. |
    | `GOOGLE_SHEETS_CREDENTIALS` | The **entire content** of the JSON key file you downloaded in step 1. Paste the raw JSON string. |

    *   *Note*: Ensure you paste the JSON exactly as is, without extra spaces interfering.

5.  **Deploy**: Click "Deploy". Vercel will detect the `vite.config.js` for frontend and `api/` folder for Python backend functions.

## 4. Local Development (Optional)
To run locally with the secrets:
1.  Create a `.env` file (already ignored by git).
2.  Add `SPREADSHEET_ID=...`
3.  Add `GOOGLE_SHEETS_CREDENTIALS='{...paste json...}'` (be careful with quoting JSON in .env files, usually single quotes work best for shells, or use a tool that supports it).

## Verification
After deployment, fill out the contact form on your live site. usage check if the data appears in your Google Sheet.
