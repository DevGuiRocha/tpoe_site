import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

function getText(prop: PageObjectResponse['properties'][string]): string {
  if (prop.type === 'rich_text') {
    return prop.rich_text.map((r) => r.plain_text).join('')
  }
  if (prop.type === 'title') {
    return prop.title.map((r) => r.plain_text).join('')
  }
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
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const dbId = process.env.NOTION_DB_FAMILIAS!
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: 'Status',
        select: { equals: 'Publicado' },
      },
      sorts: [{ property: 'Nome', direction: 'ascending' }],
    })

    const families = (response.results as PageObjectResponse[]).map((page) => {
      const p = page.properties
      const nome = getText(p['Nome'])
      return {
        slug:      toSlug(nome),
        nome,
        categoria: getSelect(p['Categoria']) as 'Alfa' | 'Beta' | 'Gama',
        descricao: getText(p['Descricao']) || null,
        historia:  getText(p['Historia']) || null,
        brasao:    getUrl(p['Brasao Familia']),
        economia:  getText(p['Economia']) || null,
        residencia: getUrl(p['Residencia Familia']),
        status:    getSelect(p['Status']) as 'Publicado' | 'Rascunho',
        data:      p['Data'].type === 'date' ? (p['Data'].date?.start ?? null) : null,
      }
    })

    res.status(200).json(families)
  } catch (error) {
    console.error('Notion API error:', error)
    res.status(500).json({ error: 'Falha ao buscar dados do Notion' })
  }
}
