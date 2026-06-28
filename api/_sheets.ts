import { google } from 'googleapis'

export function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

export const SHEET_ID = process.env.GOOGLE_SHEETS_ID!

export function row(values: (string | null | undefined)[], ...keys: number[]): string {
  return keys.map((k) => (values[k] ?? '').toString().trim()).join('')
}

export function col(values: (string | null | undefined)[], index: number): string {
  return (values[index] ?? '').toString().trim()
}
