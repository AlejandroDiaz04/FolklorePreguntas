import { useEffect, useState } from 'react'
import RankingTable from '../components/RankingTable.jsx'
import {
  isFirebaseConfigured,
  suscribirRanking,
} from '../services/firebase.js'

function Ranking() {
  const [scores, setScores] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setError(
        'Firebase no está configurado. Configurá las variables VITE_FIREBASE_* en .env',
      )
      return undefined
    }

    try {
      const unsubscribe = suscribirRanking(setScores)
      return unsubscribe
    } catch (err) {
      setError(err.message)
      return undefined
    }
  }, [])

  return (
    <div className="page page--ranking">
      <header className="ranking-header">
        <h1>Ranking — Quiz de Folklore Paraguayo</h1>
        <p>Top 10 en tiempo real</p>
      </header>

      {error ? (
        <p className="ranking-error">{error}</p>
      ) : (
        <RankingTable scores={scores} />
      )}
    </div>
  )
}

export default Ranking
