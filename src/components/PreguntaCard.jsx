function PreguntaCard({ pregunta, categoria, opciones, onSelect }) {
  return (
    <div className="pregunta-card">
      <span className="pregunta-card__categoria">{categoria}</span>
      <h2 className="pregunta-card__texto">{pregunta}</h2>
      <div className="pregunta-card__opciones">
        {opciones.map((opcion, index) => (
          <button
            key={opcion}
            type="button"
            className="btn btn--opcion"
            onClick={() => onSelect(index)}
          >
            {opcion}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PreguntaCard
