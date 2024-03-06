import cors from "cors";
import express from "express";
import { google } from "googleapis";

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(express.json());

const spreadsheetId = "1JHj75iViKiaHLjzoJcqKPG6code38a_5RIL7NtOqYfY";
const clientEmail =
  "clearvikalp@clearvikalp-landing-page.iam.gserviceaccount.com";
const privateKey =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfEF/SA+h53V86\nO72dS90mHlzQxrUJv03kuLwbPUqVt0JMup1v0X8EDyUpGxeNzqDe7Rmo5bww79Pr\nMe34Cc4p7xqsdfenAhsm21GFDQw7I81KO2Bmzf6Vw/EAAXuJo76gN5hcwQRbLHf4\nD4LZOCEP1TC/7m2i5tphyvJ/yKi7BckwCT5XIkXT34hd+aAzLSKOu/DqyV95gjfe\nVuhpiwr0FClEsBG8/Qh5PvWHc5l410E3VkuGt+3VhVQI4XcQFttgsCXJV2Fy4/Hb\nBcTzLD2Hw0OL9ZUuITxmSRSx1Zi2enGBquGRAd8rvhZPfTMoU6b3fSRu9Zq1AgbQ\nRO1yHgN1AgMBAAECggEAJXfYcmKMSOR98XwwCpTbt4Zwa5da/rxK72Uanjn+Tyz3\nV5afzj6lckHVCY1Bq5wwJcLpB/Fxtn9Pxneg7Av3PcZ+XIB/QR5MYgdIeRRdPLMO\nwP0ilKTSYtngc5Vl0cK5/QiLgdHPomBjtBGHS36evxmDXbqepcBGUcHaBIKySDdR\nqezWpZx8V2GTgNTn++p0wEgDsdSlD8DZxGyOABIZrS1xrvITdBAit9Ttww1nfEuP\ngLnGf7iic+3ukU/dEISQdY0nH7Wvj1sEAOzk1soFdvBghuhNVQoZ+XYlP4cifn4F\n7/QxXXuU7hufr0Gt+FXVsWpRYXxe8dDSYb0pS4KOAwKBgQDelRWhsp8ZHv2VuG/t\nCQNQ9jGBOxRpnumeJdpYPOrgeuDpTMtIzsHt2GK3nLsqsihgMm+z4aeON9laCC0L\nHUQRTB7DHaTik/fxj5E3qbUcT/2iPRrjSnTGJ4fQBEO6Vqsgvv7zaBXKQPCbQeXH\ngKcD+K6A8bY1zVux8agIDX0TJwKBgQC28fiJLM5L4GO0En1bXFYRVCPJtbANt/Bo\nN0IcAAQGTSMd7v4b2f+GYp0VfwLZKTfw18YYIUB2F9UT3CHSXfjn4MkgUww2onNj\nFsO2+T03vPxfA0WVu+rDlDJk3Nuv/2/9QdPudrbCshAjtELaDlfKEauPiO0aKYeR\nGReTlhkmAwKBgQCGWolHJHHCkSFSqZTuCH229hSlxAqrQqATtReaIZNJUwLF8HPY\ni+0la3MTEAkuWYHjpy4j73bbcrzBCqRdzBmVM1RyREeN+PE2H4nxhn/rCiG4N5gu\nUHgyUBQ7rQdQyBXd20w7kr1sa0yQ+vL/PJoT3J1A+iYZTc8mlw7tZW71CwKBgQCt\nakMobNOEs0hvilNPxgBD3tkpvFMNPf3iG/dLqWwnOPl/x2sSpZuFHHdAyCvABEVl\nxHOfre13w/GUKMfarH9j9f1Q6cgbBfSQyiRtjmbMLhWgTu6oGABasmDuoTiR5XWX\nwM2PLvLhLX8FCTuRjaUEA6n3nlj6wsEh9oIVwWNHVwKBgELLFUY03MDY8pbhI2Vp\n6RYk7QJIaINpXyT39ZDY8g+tYpmsQLhM/mZVEtpWz5z2ISvmxdu+jGJ2ZOusQGHq\nOgH+YVnwrujooJdb9UXdD6W1rYx0Dw6khW76DXU8IonL5NSMTwcANWQVHvTr3Xvv\nZAz5JQNKKnjFIIVJFeZ/qufH\n-----END PRIVATE KEY-----\n".replace(
    /\\n/g,
    "\n"
  );

if (!spreadsheetId || !clientEmail || !privateKey) {
  throw new Error("Missing environment variables");
}

// Google Sheets API client initialized
const sheetsClient = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  }),
});

async function appendToSheet(data) {
  const rowsToInsert = [
    [
      data.name || "",
      data.phone || "",
      "",
      data.plan || "",
      data.date || "",
      data.time || "",
      "",
      data.parameters?.campaignid || "",
      data.parameters?.utm_source || "",
      data.parameters?.utm_medium || "",
      data.parameters?.utm_campaign || "",
      data.parameters?.utm_content || "",
      data.parameters?.adgroupid || "",
      data.parameters?.targetid || "",
      data.parameters?.matchtype || "",
      data.parameters?.network || "",
      data.parameters?.gclid || "",
      data.parameters?.creative || "",
      data.parameters?.keyword || "",
      data.parameters?.placement || "",
    ],
  ];

  const getResponse = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: "Sheet1!A:Z",
  });

  const nextRow = getResponse.data.values
    ? getResponse.data.values.length + 1
    : 1;
  const updateRange = `Sheet1!A${nextRow}`;

  const updateRequest = {
    spreadsheetId: spreadsheetId,
    range: updateRange,
    valueInputOption: "USER_ENTERED",
    includeValuesInResponse: true,
    resource: {
      values: rowsToInsert,
    },
  };

  const updateResponse = await sheetsClient.spreadsheets.values.update(
    updateRequest
  );
  return updateResponse;
}

app.post("/api/append", async (req, res) => {
  try {
    const body = req.body;
    await appendToSheet(body);
    res.status(200).send("Success");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => {
  console.log(`server running at "http://localhost:${5000}" `);
});
