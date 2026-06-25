# 🚀 ClearVikalp Backend - Google Sheets Integration API

A lightweight, highly efficient Node.js/Express backend designed to capture user leads and marketing tracking parameters, routing them directly into a live Google Sheets CRM.

## 🛠 Features

- **Lead Capture Endpoint:** Exposes a secure RESTful API endpoint (`/api/append`) to receive user data.
- **UTM Tracking Support:** Automatically extracts and records comprehensive Google Ads tracking parameters (UTM source, medium, campaign, gclid, etc.) to analyze marketing attribution.
- **CORS Configured:** Securely configured Cross-Origin Resource Sharing to allow seamless interactions from frontend applications.
- **Cloud-Based Data Storage:** Bypasses traditional databases to directly populate a Google Sheet, enabling real-time access for marketing and sales teams.

## ⭐ Spotlight Feature: Google Sheets API v4 Integration & Data Pipeline

The core complexity of this application lies in its seamless, direct-to-cloud data pipeline using the Google Sheets API. 

**Why it was tricky & How it works:**
Instead of relying on a traditional database (like MongoDB or PostgreSQL), this application acts as a direct bridge to a Google Sheet. The implementation handles:
- **Service Account Authentication:** Securely authenticates with Google Cloud using a service account private key and client email without requiring manual OAuth flows or user intervention.
- **Dynamic Row Calculation:** Before inserting data, the application first fetches the current spreadsheet range (`Sheet1!A:Z`) to dynamically calculate the next available empty row (`nextRow`), ensuring previous leads are never overwritten.
- **Structured Data Mapping:** The API meticulously maps the incoming JSON payload—including deeply nested, optional marketing parameters (like `adgroupid`, `gclid`, `matchtype`)—into a precise, sequential 21-column array format required by the Google Sheets grid structure. 
- **Error Handling:** It manages asynchronous requests to the Google API, awaiting the update and gracefully handling potential failures with appropriate HTTP status codes.

This architecture solves a specific business problem: bridging frontend lead generation directly with accessible spreadsheet software used by non-technical teams, avoiding the engineering overhead of building a custom admin dashboard or managing a separate database.

## 💻 Tech Stack

- **Framework:** Node.js, Express.js
- **API Integration:** `googleapis` (Google Sheets API v4)
- **Middleware:** `cors`, `express.json()`
- **Language:** JavaScript (ES Modules configuration)

## 💡 Why This Stands Out

This project demonstrates strong engineering pragmatism. Instead of over-engineering a solution with a full relational database and admin panel for simple lead capture, it leverages the Google Sheets API to create a zero-maintenance, real-time CRM. Handling Google Service Account credentials, dynamically querying and updating grid-based spreadsheet ranges asynchronously, and strictly mapping complex marketing tracking parameters showcases my ability to build efficient, secure, and business-focused backend integrations.
