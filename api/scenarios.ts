import type { VercelRequest, VercelResponse } from '@vercel/node'
import { google } from 'googleapis'

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

function col(values: string[], index: number): string {
  return (values[index] ?? '').toString().trim()
}

function splitPipe(v: string): string[] {
  return v.split('|').map((s) => s.trim()).filter(Boolean)
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const sheets = getSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: 'Cenarios!A2:G',
    })

    const rows = (response.data.values ?? []) as string[][]
    const scenarios = rows
      .filter((r) => col(r, 5) === 'Publicado' && col(r, 0))
      .map((r) => ({
        nome:      col(r, 0),
        distrito:  col(r, 1),
        descricao: col(r, 2) || null,
        tags:      splitPipe(col(r, 3)),
        imagens:   splitPipe(col(r, 4)),
        status:    col(r, 5),
        data:      col(r, 6) || null,
      }))
      .sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))

    res.status(200).json(scenarios)
  } catch (error) {
    console.error('Sheets API error:', error)
    res.status(500).json({ error: 'Falha ao buscar cenários' })
  }
}
