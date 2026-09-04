import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RankingTable from '../components/RankingTable.jsx'
import {
  isFirebaseConfigured,
  suscribirRanking,
} from '../services/firebase.js'

function Ranking() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setError(
        'Firebase no está configurado. Configurá las variables VITE_FIREBASE_* en .env',
      )
      setLoading(false)
      return undefined
    }

    try {
      const unsubscribe = suscribirRanking({
        onData: (lista) => {
          setScores(lista)
          setError('')
          setLoading(false)
        },
        onError: (err) => {
          setError(
            err?.message ||
              'No se pudo cargar el ranking. Revisá las reglas de Firebase y tu conexión.',
          )
          setLoading(false)
        },
      })
      return unsubscribe
    } catch (err) {
      setError(err.message)
      setLoading(false)
      return undefined
    }
  }, [])

  return (
    <div className="page page--ranking">
      <header className="ranking-header">
        <Link to="/" className="btn btn--ranking-back">
          ← Volver
        </Link>
        <h1>Ranking — Quiz de Folklore Paraguayo</h1>
        <p>Top 10 en tiempo real</p>
      </header>

      {error ? (
        <p className="ranking-error">{error}</p>
      ) : loading ? (
        <p className="ranking-table__empty">Cargando ranking…</p>
      ) : (
        <RankingTable scores={scores} />
      )}
    </div>
  )
}

export default Ranking
