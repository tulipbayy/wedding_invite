const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "RSVP";

function doPost(event) {
  const data = event && event.parameter ? event.parameter : {};
  const guestName = String(data.guestName || "").trim();
  const companionName = String(data.companionName || "").trim();
  const attendance = String(data.attendance || "").trim();

  if (!guestName || !attendance) {
    return jsonResponse({ ok: false, error: "Missing required fields" });
  }

  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Guest name", "Companion name", "Attendance"]);
  }

  sheet.appendRow([new Date(), guestName, companionName, attendance]);
  return jsonResponse({ ok: true });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
