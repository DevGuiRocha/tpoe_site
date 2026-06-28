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

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const sheets = getSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: 'Familias!A2:I',
    })

    const rows = (response.data.values ?? []) as string[][]
    const families = rows
      .filter((r) => col(r, 7) === 'Publicado' && col(r, 0))
      .map((r) => {
        const nome = col(r, 0)
        return {
          slug:       toSlug(nome),
          nome,
          categoria:  col(r, 1) as 'Alfa' | 'Beta' | 'Gama',
          historia:   col(r, 2) || null,
          descricao:  col(r, 3) || null,
          brasao:     col(r, 4) || null,
          residencia: col(r, 5) || null,
          economia:   col(r, 6) || null,
          status:     col(r, 7) as 'Publicado' | 'Rascunho',
          data:       col(r, 8) || null,
        }
      })
      .sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))

    res.status(200).json(families)
  } catch (error) {
    console.error('Sheets API error:', error)
    res.status(500).json({ error: 'Falha ao buscar dados do Google Sheets' })
  }
}
