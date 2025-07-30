import dotenv from'dotenv'

dotenv.config();

if (!process.env.SECRET_CODE) {
    throw new Error("SECRET_CODE no está definido en el archivo .env");
  }


const PORT= process.env.PORT || 3000
const DB_HOST= process.env.DB_HOST 
const DB_USER= process.env.DB_USER || 'root'
const DB_PASSWORD= process.env.DB_PASSWORD 
const DB_DATABASE= process.env.DB_DATABASE || 'railway'
const DB_PORT= process.env.DB_PORT 
const SECRET_CODE= process.env.SECRET_CODE as string
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string
const GEMINI_API_KEY_ALT1 = process.env.GEMINI_API_KEY as string
const GEMINI_API_KEY_ALT2 = process.env.GEMINI_API_KEY as string
const STEAM_API = process.env.STEAM_API as string
const STEAM_RETURN_URL = process.env.STEAM_RETURN_URL as string
const STEAM_REALM = process.env.STEAM_REALM as string



export default {PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, SECRET_CODE,GEMINI_API_KEY,GEMINI_API_KEY_ALT1,GEMINI_API_KEY_ALT2,STEAM_API, STEAM_RETURN_URL,STEAM_REALM}