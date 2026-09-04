import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  guardarPuntaje,
  isFirebaseConfigured,
} from '../services/firebase.js'
import { getMensajePuntaje } from '../utils/quiz.js'

function Resultado() {
  const navigate = useNavigate()
  const location = useLocation()
  const { nombre, puntaje, aciertos, total } = location.state || {}

  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState('')
  const enviadoRef = useRef(false)

  useEffect(() => {
    if (!nombre || puntaje === undefined) {
      navigate('/', { replace: true })
    }
  }, [nombre, puntaje, navigate])

  useEffect(() => {
    if (!nombre || puntaje === undefined) return
    if (enviadoRef.current) return

    if (!isFirebaseConfigured()) {
      setError(
        'Firebase no está configurado. El puntaje no se guardará en el ranking.',
      )
      return
    }

    enviadoRef.current = true
    setGuardando(true)

    async function enviarPuntaje() {
      try {
        await guardarPuntaje({ nombre, puntaje, aciertos, total })
        setGuardado(true)
        setError('')
      } catch {
        enviadoRef.current = false
        setError('No se pudo guardar el puntaje. Verificá tu conexión.')
      } finally {
        setGuardando(false)
      }
    }

    enviarPuntaje()
  }, [nombre, puntaje, aciertos, total])

  if (!nombre || puntaje === undefined) return null

  async function reintentar() {
    if (guardando || guardado) return
    enviadoRef.current = true
    setGuardando(true)
    setError('')
    try {
      await guardarPuntaje({ nombre, puntaje, aciertos, total })
      setGuardado(true)
    } catch {
      enviadoRef.current = false
      setError('No se pudo guardar el puntaje. Verificá tu conexión.')
    } finally {
      setGuardando(false)
    }
  }

  function jugarDeNuevo() {
    sessionStorage.removeItem('jugadorNombre')
    navigate('/')
  }

  return (
    <div className="page page--resultado">
      <div className="card card--resultado">
        <h1 className="titulo">¡Listo, {nombre}!</h1>
        <p className="resultado-puntaje">{puntaje}</p>
        <p className="resultado-detalle">
          {aciertos} de {total} respuestas correctas
        </p>
        <p className="resultado-mensaje">{getMensajePuntaje(puntaje)}</p>

        {guardando && (
          <p className="resultado-estado">Guardando tu puntaje...</p>
        )}
        {guardado && (
          <p className="resultado-estado resultado-estado--ok">
            ¡Tu puntaje ya está en el ranking!
          </p>
        )}
        {error && (
          <div className="resultado-error">
            <p>{error}</p>
            {isFirebaseConfigured() && !guardado && (
              <button
                type="button"
                className="btn btn--secondary"
                onClick={reintentar}
                disabled={guardando}
              >
                Reintentar
              </button>
            )}
          </div>
        )}

        <div className="resultado-acciones">
          <Link to="/ranking" className="btn btn--primary">
            Ver ranking
          </Link>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={jugarDeNuevo}
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}

export default Resultado
