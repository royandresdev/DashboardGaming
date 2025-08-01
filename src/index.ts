import express from 'express';
import session from 'express-session';
import passport from 'passport';
import http from 'http';
import cookieParser from 'cookie-parser';
import router from "./routes/index.routes";
//import sequelize, { testConnection } from './lib/sequelize';
import { setupSteamStrategy } from './modules/auth/auth';
import cors from 'cors';
import config from './config/config';
import morgan from 'morgan';
const app = express();
const PORT = config.PORT; 


/*testConnection();

sequelize
  .sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });*/

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
   credentials: true, // Permite enviar cookies de sesión
  methods: ['GET', 'POST'],
}));
app.use(session({
  secret: 'secreto_seguro',
  saveUninitialized: true,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

setupSteamStrategy()

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
);

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    req.body
    res.redirect('/api/dashboard/steam');
  }
);

app.get('/logout', function (req, res) {
  req.logout(() => {
    res.redirect('/');
  });
});

app.use("/api", router)

server.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});
