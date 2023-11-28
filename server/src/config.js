import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";
import getDatabaseUrl from "./config/getDatabaseUrl.cjs";

const development = {
  spotifyClient: { key: process.env.SPOTIFY_CLIENT_ID },
  spotifyClientSecret: { key: process.env.SPOTIFY_CLIENT_SECRET },
  spotifyCallbackUrl: { key: process.env.SPOTIFY_DEVELOPMENT_CALLBACK },
  nodeEnv: getNodeEnv(),
  session: { secret: process.env.SESSION_SECRET },
  databaseUrl: getDatabaseUrl(getNodeEnv()),
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 3000 }
}

const test = { ...development }

const production = {
  ...development,
  spotifyCallbackUrl: { key: process.env.SPOTIFY_PRODUCTION_CALLBACK }
}

const config = { development, test, production }

export default config[getNodeEnv()]
