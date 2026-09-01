export function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function seleccionarPreguntas(todas, cantidad = 10) {
  return shuffle(todas).slice(0, Math.min(cantidad, todas.length))
}

export function calcularPuntaje(respuestas) {
  const aciertos = respuestas.filter((r) => r.esCorrecta).length
  const puntaje = aciertos * 10
  return { aciertos, puntaje, total: respuestas.length }
}

export function getMensajePuntaje(puntaje) {
  if (puntaje >= 90) return '¡Excelente! Sos un experto en folklore paraguayo.'
  if (puntaje >= 70) return '¡Muy bien! Conocés bastante de nuestra cultura.'
  if (puntaje >= 50) return '¡Buen intento! Seguí aprendiendo sobre Paraguay.'
  return '¡Gracias por participar! Hay mucho folklore por descubrir.'
}
