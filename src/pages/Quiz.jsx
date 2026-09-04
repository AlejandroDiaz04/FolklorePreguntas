import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PreguntaCard from '../components/PreguntaCard.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import preguntasData from '../data/preguntas.json'
import { calcularPuntaje, seleccionarPreguntas } from '../utils/quiz.js'

function Quiz() {
  const navigate = useNavigate()
  const location = useLocation()
  const nombre =
    location.state?.nombre || sessionStorage.getItem('jugadorNombre') || ''

  const preguntas = useMemo(
    () => seleccionarPreguntas(preguntasData, 10),
    [],
  )

  const [indice, setIndice] = useState(0)
  const [respuestas, setRespuestas] = useState([])

  useEffect(() => {
    if (!nombre) {
      navigate('/', { replace: true })
    }
  }, [nombre, navigate])

  if (!nombre) return null

  const preguntaActual = preguntas[indice]

  function handleSelect(opcionIndex) {
    const esCorrecta = opcionIndex === preguntaActual.correcta
    const detalleItem = {
      preguntaId: preguntaActual.id,
      pregunta: preguntaActual.pregunta,
      categoria: preguntaActual.categoria,
      respuestaElegida: preguntaActual.opciones[opcionIndex],
      respuestaCorrecta: preguntaActual.opciones[preguntaActual.correcta],
      esCorrecta,
    }
    const nuevasRespuestas = [...respuestas, detalleItem]

    if (indice + 1 >= preguntas.length) {
      const resultado = calcularPuntaje(nuevasRespuestas)
      navigate('/resultado', {
        state: {
          nombre,
          ...resultado,
          detalle: nuevasRespuestas,
        },
      })
      return
    }

    setRespuestas(nuevasRespuestas)
    setIndice(indice + 1)
  }

  return (
    <div className="page page--quiz">
      <ProgressBar actual={indice + 1} total={preguntas.length} />
      <PreguntaCard
        pregunta={preguntaActual.pregunta}
        categoria={preguntaActual.categoria}
        opciones={preguntaActual.opciones}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default Quiz
