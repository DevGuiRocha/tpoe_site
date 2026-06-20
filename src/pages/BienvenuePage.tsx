import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './BienvenuePage.module.css'

const paragraphs = [
  `Dinheiro. Requinte. Laços familiares. O que mais foi preciso para que os novos pais fundadores recriassem um país que, por si só, já arrancava suspiros do resto do mundo? Oh, sim... Segredos. Segredos que vão desde os artistas filhos do nepotismo até a Alta Cúpula que domina o submundo monegasco.`,
  `E ali está Mônaco, em pleno ano de 2032, prosperando cada vez mais. Sinônimo de luxúria, um lugar totalmente diferente, o mais belo, o mais caro... e o mais seguro (será?). Enquanto eles enchem os bolsos com o dinheiro de turistas deslumbrados e se orgulham de uma culinária impecável, rica em influências francesas e italianas, eu prefiro saborear o que realmente me alimenta: a hipocrisia de vocês.`,
  `E quem é que junta todas as peças desse quebra-cabeça de aparências? Quem expõe os moradores de Monte Carlo sem nenhum receio, forçando cada um de vocês a lidar com alguém que, pela primeira vez, não se assusta com os seus sobrenomes tradicionais e tampouco tem o silêncio comprado por suas fortunas? Eu! A jornalista anônima que vocês aprenderam a temer. Podem me chamar de Gossip Girl.`,
  `O meu vlog é o diário não autorizado desta aristocracia, até porque, vamos ser sinceros: Mônaco é linda sob o sol, mas fica muito mais interessante quando as máscaras caem à noite. Então me digam, o que aguarda você por aqui? Expandir seus negócios? Iniciar seus estudos na faculdade mais cara da Europa? Sair da casa dos pais? Fugir de problemas do passado? Ou apenas tentando montar o próprio império sob o meu teto?`,
  `Fiquem à vontade para espiar, mas tenham sempre em mente que hoje vocês leem os segredos de alguém, e amanhã, os seus podem ser a minha manchete principal.`,
]

export default function BienvenuePage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          {/* Header */}
          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 20XX</p>
            <h1 className={styles.title}>Bienvenue</h1>
            <div className={styles.divider} />
          </header>

          {/* Body text */}
          <article className={styles.article}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </article>

          {/* Links */}
          <div className={styles.links}>
            <a
              href="https://twitter.com/rpgofmonaco"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Twitter @rpgofmonaco"
            >
              <TwitterIcon />
              <span>@rpgofmonaco</span>
            </a>
            <a
              href="https://instagram.com/rpgofmonaco"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram @rpgofmonaco"
            >
              <InstagramIcon />
              <span>@rpgofmonaco</span>
            </a>
            <a
              href="https://chat.whatsapp.com/GEFtOavgfa703DgKBwsDaE?s=cl&p=a&mlu=3"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.receptionLink}
            >
              RECEPÇÃO
            </a>
          </div>

          {/* Signature */}
          <footer className={styles.signature}>
            <p className={styles.signatureText}>
              Vocês sabem que me amam.
            </p>
            <p className={styles.signatureXoxo}>XOXO, <em>Gossip Girl.</em></p>
          </footer>

        </div>
      </main>

      <Footer />
    </div>
  )
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
