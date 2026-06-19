import { Link } from 'react-router-dom'
import type { Family } from '../types/family'
import styles from './FamilyCard.module.css'

interface Props {
  family: Family
}

export default function FamilyCard({ family }: Props) {
  return (
    <Link to={`/familias/${family.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {family.brasao ? (
          <img src={family.brasao} alt={family.nome} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderInitial}>
              {family.nome.charAt(0)}
            </span>
          </div>
        )}
        <div className={styles.overlay} />
      </div>
      <div className={styles.nameWrap}>
        <p className={styles.name}>{family.nome}</p>
      </div>
    </Link>
  )
}
