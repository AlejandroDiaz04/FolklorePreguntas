# Ciberguardianes: Quiz de Seguridad Digital

App web para un stand con QR: los visitantes juegan desde el celular y el monitor muestra el ranking en tiempo real.

## Requisitos

- Node.js 18+
- Cuenta en [Firebase](https://console.firebase.google.com) (plan gratuito)
- Cuenta en [Vercel](https://vercel.com) para produccion

## Instalacion

```bash
npm install
```

## Configuracion de Firebase (.env)

1. Crea un proyecto en Firebase Console.
2. Activa **Realtime Database** (no Firestore).
3. Registra una app Web y copia las credenciales.
4. Copia `.env.example` a `.env` y completa:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_DATABASE_URL=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

5. Reinicia `npm run dev` despues de crear o editar `.env` (Vite solo lee las variables al arrancar).

### Reglas de Realtime Database

En Firebase Console -> Realtime Database -> Reglas, publica el contenido de `firebase-rules.json`.

Checklist de verificacion:

1. Completa un quiz de prueba en local.
2. En Resultado deberia aparecer: "Tu puntaje ya esta en el ranking!"
3. En Firebase -> Datos, verifica nodos bajo `/scores`.
4. Abre `/ranking` y confirma que aparece el Top 10.

Si falla el guardado: revisa reglas publicadas, `databaseURL` correcta y conexion a internet.

## Desarrollo

```bash
npm run dev
```

- Jugadores: http://localhost:5173/
- Monitor (ranking): http://localhost:5173/ranking

## Build

```bash
npm run build
npm run preview
```

## Deploy en Vercel

1. Sube el repo a GitHub.
2. En Vercel: Import Project -> elige el repo.
3. Framework preset: Vite. Output: `dist`.
4. En Settings -> Environment Variables (Production), agrega las mismas 5 variables `VITE_FIREBASE_*` del `.env`.
5. Deploy. Si agregas vars despues del primer deploy, haz Redeploy.
6. Genera un QR apuntando a `https://tu-dominio.vercel.app/` (ruta del jugador).

### URLs del stand

| Rol | URL |
|-----|-----|
| QR jugadores | `https://tu-dominio.vercel.app/` |
| Monitor fullscreen | `https://tu-dominio.vercel.app/ranking` (F11) |

## Editar preguntas

Archivo: `src/data/preguntas.json`

```json
{
  "id": 1,
  "categoria": "seguridad",
  "pregunta": "Texto de la pregunta",
  "opciones": ["A", "B", "C", "D"],
  "correcta": 0
}
```

`correcta` es el indice (0-3) de la opcion correcta en el JSON. En cada partida se eligen **10 preguntas al azar** y las **opciones se mezclan** (el indice correcto se recalcula).

## Puntaje

- 10 puntos por respuesta correcta
- Maximo 100 por partida
- Ranking: mayor puntaje primero; empate por quien llego antes

## Checklist previo al stand

- [ ] `.env` / vars Vercel configuradas
- [ ] Reglas RTDB publicadas
- [ ] Opciones mezcladas (la correcta no siempre es la primera)
- [ ] Partida completa en celular
- [ ] Puntaje aparece en `/ranking` sin recargar
- [ ] Dos dispositivos ven el mismo Top 10
- [ ] QR apunta a la URL HTTPS de produccion
- [ ] Monitor en `/ranking` a pantalla completa

## Reset del ranking (dia del evento)

Sin panel admin: en Firebase Console -> Realtime Database -> Datos -> borra el nodo `scores`.

## Estructura

```
src/
├── pages/       Home, Quiz, Resultado, Ranking
├── components/  ProgressBar, PreguntaCard, RankingTable
├── data/        preguntas.json
├── services/    firebase.js
└── utils/       quiz.js
```
