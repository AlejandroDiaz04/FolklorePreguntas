import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PreguntaCard from '../components/PreguntaCard.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import preguntasData from '../data/preguntas.json'
import {
  calcularPuntaje,
  formatearTiempo,
  seleccionarPreguntas,
} from '../utils/quiz.js'

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
  const [ahora, setAhora] = useState(() => performance.now())
  const inicioRef = useRef(null)

  useEffect(() => {
    if (!nombre) {
      navigate('/', { replace: true })
    }
  }, [nombre, navigate])

  useEffect(() => {
    if (!nombre) return undefined
    if (inicioRef.current == null) {
      inicioRef.current = performance.now()
    }
    const id = setInterval(() => {
      setAhora(performance.now())
    }, 250)
    return () => clearInterval(id)
  }, [nombre])

  if (!nombre) return null

  const preguntaActual = preguntas[indice]
  const elapsedMs = Math.max(
    0,
    Math.round(ahora - (inicioRef.current ?? ahora)),
  )

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
      const inicio = inicioRef.current ?? performance.now()
      const tiempoMs = Math.max(0, Math.round(performance.now() - inicio))
      const resultado = calcularPuntaje(nuevasRespuestas)
      navigate('/resultado', {
        state: {
          nombre,
          ...resultado,
          detalle: nuevasRespuestas,
          tiempoMs,
        },
      })
      return
    }

    setRespuestas(nuevasRespuestas)
    setIndice(indice + 1)
  }

  return (
    <div className="page page--quiz">
      <div className="quiz-meta">
        <ProgressBar actual={indice + 1} total={preguntas.length} />
        <div className="quiz-timer" aria-live="polite" aria-atomic="true">
          {formatearTiempo(elapsedMs)}
        </div>
      </div>
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
