import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Mônaco</p>
        <p className={styles.sub}>The Paradise On Earth &mdash; 2030</p>
        <p className={styles.credits}>
          Um projeto de roleplay criado por Júlia, Andressa, Ana's, Emilly, Kamilly, Kemili &amp; Rafaela
        </p>
      </div>
    </footer>
  )
}
