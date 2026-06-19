import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './IndependentesPage.module.css'

const texto = `Os Independentes não possuem famílias extensas como os Gamas, Betas e Alfas, contando com, no máximo, um familiar jogável. Estão espalhados por toda Mônaco, vivendo principalmente em apartamentos de alto padrão. São mais frequentemente encontrados em bairros como Sainte-Dévote, onde a vida noturna agitada ameniza a solidão característica desse grupo.

Suas fortunas podem alcançar alguns milhões, mas nunca ultrapassam a casa dos bilhões. Aqueles com menor poder aquisitivo costumam residir próximos a La Rousse, um dos bairros mais afastados da região e lar do Condomínio Alfa. Por ser uma área menor e mais distante do centro, o custo de vida é mais acessível, tornando-se uma opção viável para os Independentes que não dispõem de grandes riquezas.`

export default function IndependentesPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 2032</p>
            <h1 className={styles.title}>Independentes</h1>
            <div className={styles.divider} />
          </header>

          <article className={styles.article}>
            {texto.split('\n\n').map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </article>

        </div>
      </main>

      <Footer />
    </div>
  )
}
