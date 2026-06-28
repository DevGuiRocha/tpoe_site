import { useState, useMemo, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FamilyCard from '../components/FamilyCard'
import { useFamiliesByTier } from '../hooks/useFamilies'
import { tierInfo } from '../data/families'
import type { Tier, Family } from '../types/family'
import styles from './FamiliesPage.module.css'

type SortOption = 'antigas' | 'recentes' | 'az'

const SORT_LABELS: Record<SortOption, string> = {
  antigas:  'Mais antigas',
  recentes: 'Mais recentes',
  az:       'A–Z',
}

function sortFamilies(data: Family[], order: SortOption): Family[] {
  const sorted = [...data]
  if (order === 'az') {
    return sorted.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }
  if (order === 'recentes') {
    return sorted.sort((a, b) => (b.data ?? '').localeCompare(a.data ?? ''))
  }
  return sorted.sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
}

interface Props {
  tier: Tier
}

export default function FamiliesPage({ tier }: Props) {
  const info = tierInfo[tier]
  const { data, loading, error } = useFamiliesByTier(tier)
  const [sort, setSort] = useState<SortOption>('antigas')

  useEffect(() => { setSort('antigas') }, [tier])

  const sorted = useMemo(() => sortFamilies(data, sort), [data, sort])

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 20XX</p>
            <h1 className={styles.title}>{info.label}</h1>
            <div className={styles.divider} />
            <p className={styles.description}>{info.description}</p>
          </header>

          {!loading && !error && (
            <div className={styles.toolbar}>
              <span className={styles.toolbarLabel}>Ordenar por</span>
              <div className={styles.sortButtons}>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    className={`${styles.sortBtn} ${sort === opt ? styles.sortBtnActive : ''}`}
                    onClick={() => setSort(opt)}
                  >
                    {SORT_LABELS[opt]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <section className={styles.grid}>
            {loading && (
              <p className={styles.status}>Carregando...</p>
            )}
            {error && (
              <p className={styles.statusError}>{error}</p>
            )}
            {!loading && !error && sorted.map((family) => (
              <FamilyCard key={family.slug} family={family} />
            ))}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
