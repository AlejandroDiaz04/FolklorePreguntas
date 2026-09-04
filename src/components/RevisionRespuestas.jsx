function RevisionRespuestas({ detalle }) {
  if (!detalle?.length) return null

  return (
    <section className="revision" aria-label="Revisión de respuestas">
      <h2 className="revision__titulo">Revisión de respuestas</h2>
      <ul className="revision__lista">
        {detalle.map((item, index) => (
          <li
            key={`${item.preguntaId}-${index}`}
            className={`revision__item ${
              item.esCorrecta
                ? 'revision__item--ok'
                : 'revision__item--error'
            }`}
          >
            <div className="revision__cabecera">
              <span className="revision__numero">{index + 1}</span>
              <span className="revision__badge">
                {item.esCorrecta ? 'Correcta' : 'Incorrecta'}
              </span>
            </div>
            <p className="revision__pregunta">{item.pregunta}</p>
            <p className="revision__respuesta">
              <span className="revision__label">Tu respuesta:</span>{' '}
              {item.respuestaElegida}
            </p>
            {!item.esCorrecta && (
              <p className="revision__respuesta revision__respuesta--ok">
                <span className="revision__label">Correcta:</span>{' '}
                {item.respuestaCorrecta}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RevisionRespuestas
