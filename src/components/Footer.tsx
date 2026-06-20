import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Mônaco</p>
        <p className={styles.sub}>The Paradise On Earth &mdash; Desde 2021</p>
        <p className={styles.credits}>
          Um projeto de roleplay criado por Júlia, Andressa, Ana's, Emilly, Kamilly, Kemili &amp; Rafaella
        </p>
        <p className={styles.dev}>
          Desenvolvido por{' '}
          <a
            href="https://www.linkedin.com/in/guilherme-rocha-828701b6/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.devLink}
          >
            Guilherme Rocha
          </a>
        </p>
      </div>
    </footer>
  )
}
