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
            <p className={styles.eyebrow}>Mônaco · 20XX</p>
            <h1 className={styles.title}>Cenários</h1>
            <div className={styles.divider} />
            <p className={styles.description}>Sugestões de cenários para cenas</p>
          </header>

          {/* Mapa geral */}
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
