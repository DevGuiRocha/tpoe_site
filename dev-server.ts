import express from 'express'
import cors from 'cors'
import { Client } from '@notionhq/client'
// Necessário para redes corporativas com certificado auto-assinado
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const notion = new Client({ auth: process.env.NOTION_TOKEN })

function getText(prop: PageObjectResponse['properties'][string]): string {
  if (prop.type === 'rich_text') return prop.rich_text.map((r) => r.plain_text).join('')
  if (prop.type === 'title') return prop.title.map((r) => r.plain_text).join('')
  return ''
}
function getSelect(prop: PageObjectResponse['properties'][string]): string {
  if (prop.type === 'select' && prop.select) return prop.select.name
  return ''
}
function getUrl(prop: PageObjectResponse['properties'][string]): string | null {
  if (prop.type === 'url') return prop.url ?? null
  return null
}
function toSlug(name: string): string {
  return name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

app.get('/api/families', async (_req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DB_FAMILIAS!,
      filter: { property: 'Status', select: { equals: 'Publicado' } },
      sorts: [{ property: 'Nome', direction: 'ascending' }],
    })
    const families = (response.results as PageObjectResponse[]).map((page) => {
      const p = page.properties
      const nome = getText(p['Nome'])
      return {
        slug:      toSlug(nome),
        nome,
        categoria: getSelect(p['Categoria']),
        descricao: getText(p['Descricao']) || null,
        historia:  getText(p['Historia']) || null,
        brasao:    getUrl(p['Brasao Familia']),
        economia:  getText(p['Economia']) || null,
        residencia: getUrl(p['Residencia Familia']),
        status:    getSelect(p['Status']),
        data:      p['Data'].type === 'date' ? (p['Data'].date?.start ?? null) : null,
      }
    })
    res.json(families)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Falha ao buscar dados do Notion' })
  }
})

app.post('/api/secrets', async (req, res) => {
  const { nomePersonagem, idadePersonagem, finalTelefone, independente, segredo } = req.body

  if (!nomePersonagem || !segredo) {
    res.status(400).json({ error: 'Nome do personagem e segredo são obrigatórios' })
    return
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
          number: finalTelefone ? Number(finalTelefone) : null,
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
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Falha ao salvar segredo' })
  }
})

app.listen(3001, () => console.log('API dev server running on http://localhost:3001'))
