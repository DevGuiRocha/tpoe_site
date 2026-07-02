import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useStaticInfo } from '../hooks/useStaticInfo'
import styles from './IndependentesPage.module.css'

export default function IndependentesPage() {
  const { texto, loading, error } = useStaticInfo('Independentes')

  const paragraphs = texto
    ? texto.split(/\r?\n/).map((p) => p.trim()).filter(Boolean)
    : []

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 20XX</p>
            <h1 className={styles.title}>Independentes</h1>
            <div className={styles.divider} />
          </header>

          <article className={styles.article}>
            {loading && (
              <p className={styles.status}>Carregando...</p>
            )}
            {!loading && (error || paragraphs.length === 0) && (
              <p className={styles.status}>Em atualização...</p>
            )}
            {!loading && !error && paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </article>

        </div>
      </main>

      <Footer />
    </div>
  )
}
