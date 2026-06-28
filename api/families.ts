import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getSheetsClient, SHEET_ID, col } from './_sheets'

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Colunas: Nome(0) Categoria(1) Historia(2) Descricao(3) BrasaoFamilia(4) ResidenciaFamilia(5) Economia(6) Status(7) Data(8)
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const sheets = getSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Familias!A2:I',
    })

    const rows = response.data.values ?? []
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
