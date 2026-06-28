import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getSheetsClient, SHEET_ID } from './_sheets'

// Colunas: Nome Personagem(0) Idade Personagem(1) Final Telefone(2) Independente(3) Segredo(4) Status(5)
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' })

  const { nomePersonagem, idadePersonagem, finalTelefone, independente, segredo } = req.body

  if (!nomePersonagem || !segredo) {
    return res.status(400).json({ error: 'Nome do personagem e segredo são obrigatórios' })
  }

  try {
    const sheets = getSheetsClient()
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Segredos!A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          String(nomePersonagem).slice(0, 100),
          String(idadePersonagem ?? ''),
          String(finalTelefone ?? ''),
          independente === 'Sim' ? 'Sim' : 'Não',
          String(segredo).slice(0, 2000),
          'Rascunho',
        ]],
      },
    })

    res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Sheets API error:', error)
    res.status(500).json({ error: 'Falha ao salvar segredo' })
  }
}
