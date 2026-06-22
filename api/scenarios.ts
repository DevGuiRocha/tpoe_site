import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

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

function splitPipe(value: string): string[] {
  return value.split('|').map((s) => s.trim()).filter(Boolean)
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DB_CENARIOS!,
      filter: { property: 'Status', select: { equals: 'Publicado' } },
      sorts: [{ property: 'Data', direction: 'ascending' }],
    })

    const scenarios = (response.results as PageObjectResponse[]).map((page) => {
      const p = page.properties
      return {
        nome:      getText(p['Nome']),
        distrito:  getSelect(p['Distrito']),
        descricao: getText(p['Descricao']) || null,
        tags:      splitPipe(getText(p['Tags'])),
        imagens:   splitPipe(getText(p['Imagens'])),
        status:    getSelect(p['Status']),
      }
    })

    res.status(200).json(scenarios)
  } catch (error) {
    console.error('Notion API error:', error)
    res.status(500).json({ error: 'Falha ao buscar cenários' })
  }
}
