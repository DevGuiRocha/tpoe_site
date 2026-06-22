import { useState, useEffect } from 'react'

export interface Scenario {
  nome: string
  distrito: string
  descricao: string | null
  tags: string[]
  imagens: string[]
  status: string
}

interface State {
  data: Scenario[]
  loading: boolean
  error: string | null
}

export function useScenarios() {
  const [state, setState] = useState<State>({ data: [], loading: true, error: null })

  useEffect(() => {
    fetch('/api/scenarios')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar cenários')
        return res.json() as Promise<Scenario[]>
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: [], loading: false, error: err.message }))
  }, [])

  return state
}

export function useScenariosByDistrict() {
  const { data, loading, error } = useScenarios()

  const grouped = data.reduce<Record<string, Scenario[]>>((acc, scenario) => {
    const key = scenario.distrito || 'Outros'
    if (!acc[key]) acc[key] = []
    acc[key].push(scenario)
    return acc
  }, {})

  return { data: grouped, loading, error }
}
