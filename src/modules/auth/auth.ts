import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import env from '../../config/config';


// 🔑 Pasá la API Key y URL de retorno
export const setupSteamStrategy = () => {
passport.use(new SteamStrategy(
  {
    returnURL: env.STEAM_RETURN_URL,
    realm: env.STEAM_REALM, 
    apiKey: env.STEAM_API,
  },
  function (identifier:any, profile:any, done:any) {
    // Este callback se llama cuando Steam autentica
    // Podés guardar usuario en base o seguir con el flujo
    profile.identifier = identifier;
    return done(null, profile);
  }
));
};
// Serializar usuario para sesión
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj:any, done) {
  done(null, obj);
});
