function ProgressBar({ actual, total }) {
  const porcentaje = total > 0 ? (actual / total) * 100 : 0

  return (
    <div className="progress-bar">
      <div className="progress-bar__label">
        Pregunta {actual} de {total}
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
