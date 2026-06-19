export type Tier = 'Alfa' | 'Beta' | 'Gama'
export type FamilyStatus = 'Publicado' | 'Rascunho'

export interface Family {
  slug: string
  nome: string
  categoria: Tier
  descricao: string | null
  historia: string | null
  brasao: string | null
  economia: string | null
  residencia: string | null
  status: FamilyStatus
  data: string | null
}
