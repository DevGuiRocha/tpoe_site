import type { VercelRequest, VercelResponse } from '@vercel/node'
import { google } from 'googleapis'

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  return google.sheets({ version: 'v4', auth })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { pagina } = req.query
  if (!pagina || typeof pagina !== 'string') {
    return res.status(400).json({ error: 'Parâmetro "pagina" obrigatório' })
  }

  try {
    const sheets = getSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: 'Infos Estaticas!A2:B',
    })

    const rows = (response.data.values ?? []) as string[][]
    const key = pagina.toLowerCase()
    const row = rows.find((r) => (r[0] ?? '').trim().toLowerCase() === key)
    const texto = row ? (row[1] ?? '').trim() : null

    res.status(200).json({ texto })
  } catch (error) {
    console.error('Sheets API error:', error)
    res.status(500).json({ error: 'Falha ao buscar informação' })
  }
}
