import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './HomePage.module.css'

const families = {
  alfa: ['Servitje-Sikes', 'Ashbourne', 'Fletcher', 'Pemberton-Sinclair', 'Van Hout', 'Maldonado'],
  beta: ['Lavallière', 'Rossetti-Ashford', 'Archambault', 'Narong', 'Viëtor'],
  gama: ['Dmitriev Dawson', 'Tchaikovsky', 'Hawthorne & Sterling', 'Blaine', 'Durant'],
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Bem-vindo a</p>
          <h1 className={styles.heroTitle}>Mônaco</h1>
          <p className={styles.heroTagline}>The Paradise On Earth</p>
          <div className={styles.heroDivider} />
          <p className={styles.heroQuote}>
            Dinheiro. Requinte. Laços familiares.<br />
            O que mais foi preciso para que os novos pais fundadores<br />
            recriassem um país que por si só já arrancava suspiros?
          </p>
          <a href="/enredo" className={styles.heroCta}>
            Descobrir o enredo
          </a>
        </div>
        <div className={styles.heroScroll}>
          <span />
        </div>
      </section>

      {/* Intro */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.introLabel}>2032 · Roleplay</p>
          <h2 className={styles.introHeading}>O que te aguarda em Mônaco?</h2>
          <p className={styles.introText}>
            Expandir seu negócio? Iniciar seus estudos? Sair da casa dos pais?
            Em Mônaco, cada escolha ecoa pelos salões dourados e pelas ruelas secretas
            desta nação que prospera entre o luxo do turismo, a excelência culinária
            e os segredos que ninguém ousa revelar — exceto uma jornalista anônima
            que não teme ninguém.
          </p>
        </div>
      </section>

      {/* Families */}
      <section className={styles.families}>
        <div className={styles.familiesInner}>
          <p className={styles.sectionLabel}>As grandes famílias</p>
          <h2 className={styles.sectionHeading}>Quem governa Mônaco</h2>

          <div className={styles.familiesGrid}>
            <FamilyTier tier="Alfa" names={families.alfa} />
            <FamilyTier tier="Beta" names={families.beta} />
            <FamilyTier tier="Gama" names={families.gama} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>Pronta para entrar?</p>
          <h2 className={styles.ctaHeading}>A sua história começa aqui</h2>
          <div className={styles.ctaButtons}>
            <a
              href="https://chat.whatsapp.com/GEFtOavgfa703DgKBwsDaE?s=cl&p=a&mlu=3"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButtonPrimary}
            >
              Recepção
            </a>
            <a href="/enredo" className={styles.ctaButtonSecondary}>Ler o enredo</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FamilyTier({ tier, names }: { tier: string; names: string[] }) {
  return (
    <div className={styles.familyTier}>
      <div className={styles.familyTierHeader}>
        <span className={styles.familyTierLabel}>Família</span>
        <h3 className={styles.familyTierTitle}>{tier}</h3>
      </div>
      <ul className={styles.familyList}>
        {names.map((name) => (
          <li key={name} className={styles.familyItem}>
            <span className={styles.familyDot} />
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
