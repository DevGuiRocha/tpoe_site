import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useScenariosByDistrict } from '../hooks/useScenarios'
import type { Scenario } from '../hooks/useScenarios'
import styles from './CenariosPage.module.css'

const DISTRICT_ORDER = [
  'Monte-Carlo',
  'Larvotto',
  'La Rousse',
  'La Condamine',
  'Monaco-Ville',
  'Fontvieille',
  'Sainte-Dévote',
  'Les Moneghetti',
  'Jardin Exotique',
]

export default function CenariosPage() {
  const { data: grouped, loading, error } = useScenariosByDistrict()

  const districts = [
    ...DISTRICT_ORDER.filter((d) => grouped[d]),
    ...Object.keys(grouped).filter((d) => !DISTRICT_ORDER.includes(d)),
  ]

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 20XX</p>
            <h1 className={styles.title}>Cenários</h1>
            <div className={styles.divider} />
            <p className={styles.description}>Sugestões de cenários para cenas</p>
          </header>

          <section className={styles.mapSection}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5636.890804572!2d7.4246!3d43.7384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1718800000000"
              title="Mapa de Mônaco"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

          {loading && (
            <p className={styles.statusMsg}>Carregando cenários...</p>
          )}

          {error && (
            <p className={styles.statusMsg + ' ' + styles.statusError}>{error}</p>
          )}

          {!loading && !error && (
            <section className={styles.districts}>
              {districts.map((districtName) => (
                <DistrictSection
                  key={districtName}
                  name={districtName}
                  scenarios={grouped[districtName]}
                />
              ))}
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}

function DistrictSection({ name, scenarios }: { name: string; scenarios: Scenario[] }) {
  const districtTags = Array.from(new Set(scenarios.flatMap((s) => s.tags)))

  return (
    <article className={styles.district}>
      <div className={styles.districtHeader}>
        <div className={styles.districtTitleRow}>
          <h2 className={styles.districtName}>{name}</h2>
          <div className={styles.districtTags}>
            {districtTags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={styles.districtDivider} />
      </div>

      <div className={styles.locations}>
        {scenarios.map((scenario) => (
          <LocationCard key={scenario.nome} scenario={scenario} />
        ))}
      </div>
    </article>
  )
}

function LocationCard({ scenario }: { scenario: Scenario }) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const images = scenario.imagens

  function changeTo(index: number) {
    setFading(true)
    setTimeout(() => {
      setCurrent(index)
      setFading(false)
    }, 350)
  }

  function prev() {
    changeTo((current - 1 + images.length) % images.length)
  }

  function next() {
    changeTo((current + 1) % images.length)
  }

  return (
    <div className={styles.location}>
      {images.length > 0 ? (
        <div className={styles.carousel}>
          <img
            src={images[current]}
            alt={`${scenario.nome} — ${current + 1}`}
            className={`${styles.carouselImage}${fading ? ' ' + styles.fade : ''}`}
          />
          {images.length > 1 && (
            <>
              <button className={`${styles.carouselBtn} ${styles.carouselPrev}`} onClick={prev} aria-label="Anterior">‹</button>
              <button className={`${styles.carouselBtn} ${styles.carouselNext}`} onClick={next} aria-label="Próxima">›</button>
              <div className={styles.carouselDots}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                    onClick={() => changeTo(i)}
                    aria-label={`Imagem ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.locationImagePlaceholder} />
      )}

      <p className={styles.locationName}>{scenario.nome}</p>

      {scenario.descricao && (
        <p className={styles.locationDesc}>{scenario.descricao}</p>
      )}
    </div>
  )
}
