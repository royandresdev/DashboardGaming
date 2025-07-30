// import { createPool, PoolConnection } from "mysql2/promise";
// import config from "../config/config";

// export const pool = createPool({
//     host: config.DB_HOST,
//     user: config.DB_USER,
//     password: config.DB_PASSWORD,
//     port: Number(config.DB_PORT) ,
//     database: config.DB_DATABASE,
// });

// export async function testConnection() {
//     try {
//         const connection: PoolConnection = await pool.getConnection();
//         console.log('Conexión exitosa a la base de datos');
//         connection.release();
//     } catch (err) {
//         console.error('Error de conexión a la base de datos:', err);
//     }
// }
