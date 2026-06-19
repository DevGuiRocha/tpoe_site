export type Tier = 'Alfa' | 'Beta' | 'Gama'
export type FamilyStatus = 'Publicado' | 'Rascunho'

export interface Family {
  slug: string
  nome: string
  categoria: Tier
  descricao?: string       // Fisicamente
  historia?: string        // História & Personalidade
  brasao?: string          // URL da imagem do brasão
  economia?: string        // Economicamente
  residencia?: string      // Casa onde moram
  status: FamilyStatus
  data?: string            // Data de criação
}

export const tierInfo: Record<Tier, { label: string; description: string; path: string }> = {
  Alfa: {
    label: 'Famílias Alfa',
    description:
      'As famílias mal conhecidas, que estão por trás dos panos, procurando a ascensão econômica por meio do trabalho árduo.',
    path: '/familias/alfa',
  },
  Beta: {
    label: 'Famílias Beta',
    description:
      'As famílias menos afortunadas economicamente, procurando a ascensão social.',
    path: '/familias/beta',
  },
  Gama: {
    label: 'Famílias Gama',
    description:
      'As famílias mais influentes de Mônaco, que competem entre si para o título da família mais importante do país.',
    path: '/familias/gama',
  },
}

export const tierRouteMap: Record<string, Tier> = {
  alfa: 'Alfa',
  beta: 'Beta',
  gama: 'Gama',
}

export const families: Family[] = [
  // Alfa
  { slug: 'servitje-sikes',     nome: 'Servitje-Sikes',       categoria: 'Alfa', status: 'Publicado' },
  { slug: 'ashbourne',          nome: 'Ashbourne',            categoria: 'Alfa', status: 'Publicado' },
  { slug: 'fletcher',           nome: 'Fletcher',             categoria: 'Alfa', status: 'Publicado' },
  { slug: 'pemberton-sinclair', nome: 'Pemberton-Sinclair',   categoria: 'Alfa', status: 'Publicado' },
  { slug: 'van-hout',           nome: 'Van Hout',             categoria: 'Alfa', status: 'Publicado' },
  { slug: 'maldonado',          nome: 'Maldonado',            categoria: 'Alfa', status: 'Publicado' },
  // Beta
  { slug: 'lavaliere',          nome: 'Lavallière',           categoria: 'Beta', status: 'Publicado' },
  { slug: 'rossetti-ashford',   nome: 'Rossetti-Ashford',     categoria: 'Beta', status: 'Publicado' },
  { slug: 'archambault',        nome: 'Archambault',          categoria: 'Beta', status: 'Publicado' },
  { slug: 'narong',             nome: 'Narong',               categoria: 'Beta', status: 'Publicado' },
  { slug: 'vietor',             nome: 'Viëtor',               categoria: 'Beta', status: 'Publicado' },
  // Gama
  { slug: 'dmitriev-dawson',    nome: 'Dmitriev Dawson',      categoria: 'Gama', status: 'Publicado' },
  { slug: 'tchaikovsky',        nome: 'Tchaikovsky',          categoria: 'Gama', status: 'Publicado' },
  { slug: 'hawthorne-sterling', nome: 'Hawthorne & Sterling', categoria: 'Gama', status: 'Publicado' },
  { slug: 'blaine',             nome: 'Blaine',               categoria: 'Gama', status: 'Publicado' },
  { slug: 'durant',             nome: 'Durant',               categoria: 'Gama', status: 'Publicado' },
]

export function familiesByTier(tier: Tier) {
  return families.filter((f) => f.categoria === tier && f.status === 'Publicado')
}

export function familyBySlug(slug: string) {
  return families.find((f) => f.slug === slug && f.status === 'Publicado')
}
