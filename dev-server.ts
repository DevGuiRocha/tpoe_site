import express from 'express'
import cors from 'cors'
import { google } from 'googleapis'
import 'dotenv/config'

// Necessário para redes corporativas com certificado auto-assinado
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = express()
app.use(cors())
app.use(express.json())

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

function col(values: (string | null | undefined)[], index: number): string {
  return (values[index] ?? '').toString().trim()
}

function toSlug(name: string): string {
  return name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ── GET /api/families ─────────────────────────────────────────────────────────
app.get('/api/families', async (_req, res) => {
  try {
    const sheets = getSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Familias!A2:I',
    })
    const rows = response.data.values ?? []
    const splitPipe = (v: string) => v.split('|').map((s) => s.trim()).filter(Boolean)
    const families = rows
      .filter((r) => col(r, 7) === 'Publicado' && col(r, 0))
      .map((r) => {
        const nome = col(r, 0)
        return {
          slug:       toSlug(nome),
          nome,
          categoria:  col(r, 1),
          historia:   col(r, 2) || null,
          descricao:  col(r, 3) || null,
          brasao:     col(r, 4) || null,
          residencia: col(r, 5) || null,
          economia:   col(r, 6) || null,
          status:     col(r, 7),
          data:       col(r, 8) || null,
        }
      })
      .sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
    res.json(families)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Falha ao buscar famílias' })
  }
})

// ── GET /api/scenarios ────────────────────────────────────────────────────────
app.get('/api/scenarios', async (_req, res) => {
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
    res.json(scenarios)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Falha ao buscar cenários' })
  }
})

// ── GET /api/static-info ──────────────────────────────────────────────────────
app.get('/api/static-info', async (req, res) => {
  const pagina = req.query.pagina as string | undefined
  if (!pagina) {
    res.status(400).json({ error: 'Parâmetro "pagina" obrigatório' })
    return
  }

  try {
    const sheets = getSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Infos Estaticas!A2:B',
    })
    const rows = response.data.values ?? []
    const key = pagina.toLowerCase()
    const row = rows.find((r) => col(r, 0).toLowerCase() === key)
    const texto = row ? col(row, 1) || null : null
    res.json({ texto })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Falha ao buscar informação' })
  }
})

// ── POST /api/secrets ─────────────────────────────────────────────────────────
app.post('/api/secrets', async (req, res) => {
  const { nomePersonagem, idadePersonagem, finalTelefone, independente, segredo } = req.body

  if (!nomePersonagem || !segredo) {
    res.status(400).json({ error: 'Nome do personagem e segredo são obrigatórios' })
    return
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
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Falha ao salvar segredo' })
  }
})

app.listen(3001, () => console.log('API dev server running on http://localhost:3001'))
