export type { Tier, FamilyStatus, Family } from '../types/family'
import type { Tier } from '../types/family'

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

export const tierRouteMap: Record<string, 'Alfa' | 'Beta' | 'Gama'> = {
  alfa: 'Alfa',
  beta: 'Beta',
  gama: 'Gama',
}
