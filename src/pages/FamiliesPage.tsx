import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FamilyCard from '../components/FamilyCard'
import { familiesByTier, tierInfo, type Tier } from '../data/families'
import styles from './FamiliesPage.module.css'

interface Props {
  tier: Tier
}

export default function FamiliesPage({ tier }: Props) {
  const info = tierInfo[tier]
  const list = familiesByTier(tier)

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 2032</p>
            <h1 className={styles.title}>{info.label}</h1>
            <div className={styles.divider} />
            <p className={styles.description}>{info.description}</p>
          </header>

          <section className={styles.grid}>
            {list.map((family) => (
              <FamilyCard key={family.slug} family={family} />
            ))}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
