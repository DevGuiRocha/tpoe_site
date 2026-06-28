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
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
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
