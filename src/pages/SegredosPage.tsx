import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './SegredosPage.module.css'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function SegredosPage() {
  const [nomePersonagem, setNomePersonagem] = useState('')
  const [idadePersonagem, setIdadePersonagem] = useState('')
  const [finalTelefone, setFinalTelefone] = useState('')
  const [independente, setIndependente] = useState<'Sim' | 'Não'>('Não')
  const [segredo, setSegredo] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('loading')

    try {
      const res = await fetch('/api/secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomePersonagem, idadePersonagem, finalTelefone, independente, segredo }),
      })

      if (!res.ok) throw new Error()

      setFormState('success')
      setNomePersonagem('')
      setIdadePersonagem('')
      setFinalTelefone('')
      setIndependente('Não')
      setSegredo('')
    } catch {
      setFormState('error')
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <p className={styles.eyebrow}>Mônaco · 20XX</p>
            <h1 className={styles.title}>Segredo</h1>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Você tem um segredo para me contar?
            </p>
            <p className={styles.warning}>
              Lembrando que esperamos criatividade de vocês! Já temos muitos assassinos e ladrões.{' '}
              <strong>Estupros não são permitidos.</strong>
            </p>
          </header>

          {formState === 'success' ? (
            <div className={styles.successWrap}>
              <p className={styles.successTitle}>Segredo recebido.</p>
              <p className={styles.successText}>
                As administradoras irão analisar em breve.
              </p>
              <button className={styles.resetBtn} onClick={() => setFormState('idle')}>
                Enviar outro
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="nomePersonagem">
                  Nome do Personagem
                </label>
                <input
                  id="nomePersonagem"
                  className={styles.input}
                  type="text"
                  value={nomePersonagem}
                  onChange={(e) => setNomePersonagem(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="idadePersonagem">
                    Idade do Personagem
                  </label>
                  <input
                    id="idadePersonagem"
                    className={styles.input}
                    type="number"
                    min={1}
                    max={120}
                    value={idadePersonagem}
                    onChange={(e) => setIdadePersonagem(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="finalTelefone">
                    4 últimos dígitos do telefone
                  </label>
                  <input
                    id="finalTelefone"
                    className={styles.input}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    pattern="\d{4}"
                    value={finalTelefone}
                    onChange={(e) => setFinalTelefone(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Seu personagem é independente?</span>
                <div className={styles.radioGroup}>
                  {(['Sim', 'Não'] as const).map((opt) => (
                    <label key={opt} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="independente"
                        value={opt}
                        checked={independente === opt}
                        onChange={() => setIndependente(opt)}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioCustom} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="segredo">
                  Segredo
                </label>
                <textarea
                  id="segredo"
                  className={styles.textarea}
                  value={segredo}
                  onChange={(e) => setSegredo(e.target.value)}
                  required
                  maxLength={2000}
                  rows={6}
                />
              </div>

              {formState === 'error' && (
                <p className={styles.errorMsg}>
                  Algo deu errado. Tente novamente.
                </p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={formState === 'loading'}
              >
                {formState === 'loading' ? 'Enviando...' : 'Enviar'}
              </button>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
