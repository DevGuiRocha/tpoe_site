import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { districts } from '../data/scenarios'
import styles from './CenariosPage.module.css'

export default function CenariosPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          {/* Header */}
          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 2032</p>
            <h1 className={styles.title}>Cenários</h1>
            <div className={styles.divider} />
            <p className={styles.description}>Sugestões de cenários para cenas</p>
          </header>

          {/* Mapa geral */}
          <section className={styles.mapSection}>
            <div className={styles.mapPlaceholder}>
              <span className={styles.mapPlaceholderText}>Mapa de Mônaco — em breve</span>
            </div>
          </section>

          {/* Distritos */}
          <section className={styles.districts}>
            {districts.map((district) => (
              <article key={district.name} className={styles.district}>

                {/* Cabeçalho do distrito */}
                <div className={styles.districtHeader}>
                  <div className={styles.districtTitleRow}>
                    <h2 className={styles.districtName}>{district.name}</h2>
                    <div className={styles.districtTags}>
                      {district.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.districtDivider} />
                </div>

                {/* Imagem do distrito */}
                {district.mapImage ? (
                  <img
                    src={district.mapImage}
                    alt={`Mapa de ${district.name}`}
                    className={styles.districtImage}
                  />
                ) : (
                  <div className={styles.districtImagePlaceholder}>
                    <span>Imagem do distrito — em breve</span>
                  </div>
                )}

                {/* Locais */}
                <div className={styles.locations}>
                  {district.locations.map((loc) => (
                    <div key={loc.name} className={styles.location}>
                      {loc.image ? (
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className={styles.locationImage}
                        />
                      ) : (
                        <div className={styles.locationImagePlaceholder} />
                      )}
                      <p className={styles.locationName}>{loc.name}</p>
                    </div>
                  ))}
                </div>

              </article>
            ))}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
