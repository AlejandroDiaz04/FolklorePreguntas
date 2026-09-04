import { formatearTiempo } from '../utils/quiz.js'

const MEDALLAS = ['🥇', '🥈', '🥉']

function RankingTable({ scores }) {
  if (scores.length === 0) {
    return (
      <p className="ranking-table__empty">
        Aún no hay puntajes. ¡Sé el primero en jugar!
      </p>
    )
  }

  return (
    <table className="ranking-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Puntaje</th>
          <th>Tiempo</th>
          <th>Aciertos</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr
            key={`${score.nombre}-${score.timestamp}-${index}`}
            className={index < 3 ? `ranking-table__row--top${index + 1}` : ''}
          >
            <td>
              {index < 3 ? MEDALLAS[index] : index + 1}
            </td>
            <td>{score.nombre}</td>
            <td>{score.puntaje}</td>
            <td>{formatearTiempo(score.tiempoMs)}</td>
            <td>
              {score.aciertos}/{score.total}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RankingTable
