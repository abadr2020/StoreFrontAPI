import dotenv from 'dotenv'

dotenv.config()

const appConfig = {
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: process.env.SALT_ROUNDS,
  pepper: process.env.PEPPER,
}

export default appConfig
