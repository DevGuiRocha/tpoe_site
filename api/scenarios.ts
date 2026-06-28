import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getSheetsClient, SHEET_ID, col } from './_sheets'

// Colunas: Nome(0) Distrito(1) Descricao(2) Tags(3) Imagens(4) Status(5) Data(6)
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const sheets = getSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Cenarios!A2:G',
    })

    const rows = response.data.values ?? []
    const splitPipe = (v: string) => v.split('|').map((s) => s.trim()).filter(Boolean)

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
