import { useState, useEffect } from 'react'
import type { Family, Tier } from '../types/family'

interface State {
  data: Family[]
  loading: boolean
  error: string | null
}

export function useFamilies() {
  const [state, setState] = useState<State>({ data: [], loading: true, error: null })

  useEffect(() => {
    fetch('/api/families')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar famílias')
        return res.json() as Promise<Family[]>
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: [], loading: false, error: err.message }))
  }, [])

  return state
}

export function useFamiliesByTier(tier: Tier) {
  const { data, loading, error } = useFamilies()
  return {
    data: data.filter((f) => f.categoria === tier),
    loading,
    error,
  }
}

export function useFamilyBySlug(slug: string) {
  const { data, loading, error } = useFamilies()
  return {
    data: data.find((f) => f.slug === slug) ?? null,
    loading,
    error,
  }
}
