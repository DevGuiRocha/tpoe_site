import { useState, useEffect } from 'react'

interface StaticInfoState {
  texto: string | null
  loading: boolean
  error: string | null
}

export function useStaticInfo(pagina: string): StaticInfoState {
  const [state, setState] = useState<StaticInfoState>({
    texto: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    setState({ texto: null, loading: true, error: null })

    fetch(`/api/static-info?pagina=${encodeURIComponent(pagina)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setState({ texto: data.texto, loading: false, error: null })
      })
      .catch((err) => {
        setState({ texto: null, loading: false, error: err.message })
      })
  }, [pagina])

  return state
}
