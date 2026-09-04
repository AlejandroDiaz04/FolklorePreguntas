import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let db = null

function getDb() {
  if (!db) {
    if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) {
      throw new Error('Firebase no está configurado. Revisá el archivo .env')
    }
    const app = initializeApp(firebaseConfig)
    db = getDatabase(app)
  }
  return db
}

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL)
}

export async function guardarPuntaje({ nombre, puntaje, aciertos, total }) {
  const database = getDb()
  const scoresRef = ref(database, 'scores')
  await push(scoresRef, {
    nombre,
    puntaje,
    aciertos,
    total,
    timestamp: Date.now(),
  })
}

export function suscribirRanking({ onData, onError }) {
  const database = getDb()
  const scoresRef = ref(database, 'scores')

  return onValue(
    scoresRef,
    (snapshot) => {
      const data = snapshot.val()
      const scores = data
        ? Object.values(data).sort((a, b) => {
            if (b.puntaje !== a.puntaje) return b.puntaje - a.puntaje
            return a.timestamp - b.timestamp
          })
        : []
      onData(scores.slice(0, 10))
    },
    (error) => {
      onError?.(error)
    },
  )
}
