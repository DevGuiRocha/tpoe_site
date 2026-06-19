import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFamilyBySlug } from '../hooks/useFamilies'
import { tierInfo, type Tier } from '../data/families'
import styles from './FamilyDetailPage.module.css'

export default function FamilyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: family, loading, error } = useFamilyBySlug(slug ?? '')

  useEffect(() => {
    if (!loading && !error && slug && !family) navigate('/', { replace: true })
  }, [loading, error, slug, family, navigate])

  if (loading) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.statusWrap}>
          <p className={styles.status}>Carregando...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.statusWrap}>
          <p className={styles.statusError}>{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!family) return null

  const tier = tierInfo[family.categoria as Tier]

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>

        {/* Hero — brasão da família */}
        <div className={styles.hero}>
          {family.brasao ? (
            <img src={family.brasao} alt={family.nome} className={styles.heroImage} />
          ) : (
            <div className={styles.heroPlaceholder}>
              <span className={styles.heroInitial}>{family.nome.charAt(0)}</span>
            </div>
          )}
          <div className={styles.heroGradient} />
          <div className={styles.heroContent}>
            <Link to={tier.path} className={styles.breadcrumb}>
              ← {tier.label}
            </Link>
            <h1 className={styles.heroTitle}>{family.nome}</h1>
            <span className={styles.heroBadge}>{tier.label}</span>
          </div>
        </div>

        {/* Body */}
        <div className={styles.container}>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Fisicamente</h2>
            <div className={styles.divider} />
            {family.descricao
              ? <p className={styles.bodyText}>{family.descricao}</p>
              : <p className={styles.empty}>Em breve.</p>
            }
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>História &amp; Personalidade</h2>
            <div className={styles.divider} />
            {family.historia
              ? <p className={styles.bodyText}>{family.historia}</p>
              : <p className={styles.empty}>Em breve.</p>
            }
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Economicamente</h2>
            <div className={styles.divider} />
            {family.economia
              ? <p className={styles.bodyText}>{family.economia}</p>
              : <p className={styles.empty}>Em breve.</p>
            }
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Residência</h2>
            <div className={styles.divider} />
            {family.residencia
              ? <img src={family.residencia} alt={`Residência ${family.nome}`} className={styles.residenciaImage} />
              : <p className={styles.empty}>Em breve.</p>
            }
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
