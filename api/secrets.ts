import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { nomePersonagem, idadePersonagem, finalTelefone, independente, segredo } = req.body

  if (!nomePersonagem || !segredo) {
    return res.status(400).json({ error: 'Nome do personagem e segredo são obrigatórios' })
  }

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_SEGREDOS! },
      properties: {
        'Nome Personagem': {
          title: [{ text: { content: String(nomePersonagem).slice(0, 100) } }],
        },
        'Idade Personagem': {
          number: Number(idadePersonagem) || null,
        },
        'Final Telefone': {
          rich_text: [{ text: { content: String(finalTelefone ?? '') } }],
        },
        'Independente': {
          select: { name: independente === 'Sim' ? 'Sim' : 'Não' },
        },
        'Segredo': {
          rich_text: [{ text: { content: String(segredo).slice(0, 2000) } }],
        },
        'Status': {
          select: { name: 'Rascunho' },
        },
      },
    })

    res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Notion API error:', error)
    res.status(500).json({ error: 'Falha ao salvar segredo' })
  }
}
