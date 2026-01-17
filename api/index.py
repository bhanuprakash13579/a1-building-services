from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import os
import json
import datetime

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production security if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    phone: str
    service: str = "General"
    message: str = ""
    language: str = "en"

@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    # Google Sheets Logic
    creds_json = os.environ.get('GOOGLE_SHEETS_CREDENTIALS')
    spreadsheet_id = os.environ.get('SPREADSHEET_ID')

    if not creds_json or not spreadsheet_id:
        # Fallback for dev mode without creds
        print("Missing Credentials - Simulating Save")
        return {"success": True, "message": "Simulated Save (No Creds)"}

    try:
        creds_dict = json.loads(creds_json)
        creds = Credentials.from_service_account_info(
            creds_dict, scopes=['https://www.googleapis.com/auth/spreadsheets']
        )
        service = build('sheets', 'v4', credentials=creds)

        values = [[
            datetime.datetime.now().isoformat(),
            form.name,
            form.phone,
            form.service,
            form.message,
            form.language
        ]]

        body = {'values': values}
        service.spreadsheets().values().append(
            spreadsheetId=spreadsheet_id, range='Sheet1!A:F',
            valueInputOption='USER_ENTERED', body=body
        ).execute()

        return {"success": True, "message": "Saved to Sheets"}

    except Exception as e:
        print(f"Sheets Error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Storage Error: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
