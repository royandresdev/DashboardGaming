import { Request, Response } from 'express';
import axios from 'axios';
import config from '../../config/config';
import { generateContentWithRetry } from '../../lib/giminiClient';

interface SteamProfile {
  identifier: string;
  _json: {
    steamid: string;
    personaname: string;
    avatar: string;
    [key: string]: any;
  };
}

const dashboard = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as SteamProfile;
  if (!req.user) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  const steamId = user._json.steamid;

  const ownedGamesURL = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${config.STEAM_API}&steamid=${steamId}&include_appinfo=1&format=json`;
  const recentGamesURL = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${config.STEAM_API}&steamid=${steamId}&format=json`;

  try {
    const [owned, recent] = await Promise.all([
      axios.get(ownedGamesURL),
      axios.get(recentGamesURL)
    ]);

    const ownedGames = owned.data.response.games || [];
    const recentGames = recent.data.response.games || [];

    let totalPlaytimeForever = 0;
    let totalPlaytime2Weeks = 0;
    let totalAchievementsUnlocked = 0;
    let totalAchievementsUnlocked2Weeks = 0;

    const now = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60);

    let recentAddedGames = 0;

    const rawActivities: any[] = [];

    const recentWithDetails = await Promise.all(
      recentGames.map(async (game: any) => {
        const appid = game.appid;

        const achievementsURL = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${config.STEAM_API}&steamid=${steamId}&format=json`;
        const schemaURL = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?appid=${appid}&key=${config.STEAM_API}`;
        const tagsURL = `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=us&l=en`;

        let achievementsUnlocked = 0;
        let achievementsTotal = 0;
        let achievements: any[] = [];
        let tags: string[] = [];

        try {
          const [achievementsResp, schemaResp, tagsResp] = await Promise.all([
            axios.get(achievementsURL),
            axios.get(schemaURL),
            axios.get(tagsURL)
          ]);

          const unlocked = achievementsResp?.data?.playerstats?.achievements?.filter(
            (a: any) => a.achieved === 1
          ) || [];

          const schemaAchievements = schemaResp?.data?.game?.availableGameStats?.achievements || [];
          achievementsTotal = schemaAchievements.length;
          achievementsUnlocked = unlocked.length;

          totalAchievementsUnlocked += achievementsUnlocked;

          unlocked.forEach((a: any) => {
            if (a.unlocktime >= now - (14 * 24 * 60 * 60)) {
              totalAchievementsUnlocked2Weeks++;
              const meta = schemaAchievements.find((m: any) => m.name === a.apiname);
              rawActivities.push({
                nombre: "LOGRO DESBLOQUEADO",
                descripcion: meta?.displayName || a.apiname, // ✅ Nombre correcto
                juego: game.name,
                fecha: new Date(a.unlocktime * 1000).toLocaleDateString('es-AR')
              });
            }
          });

          achievements = unlocked.map((a: any) => {
            const meta = schemaAchievements.find((m: any) => m.name === a.apiname);
            return {
              apiname: a.apiname,
              unlocktime: a.unlocktime,
              displayName: meta?.displayName || a.apiname,
              description: meta?.description || "",
              icon: meta?.icon || "",
            };
          });

          if (tagsResp?.data?.[appid]?.success) {
            tags = tagsResp?.data?.[appid]?.data?.genres?.map((g: any) => g.description) || [];
          }

        } catch (err) {
          console.warn(`❗ Sin stats/tags/schema para appid ${appid}`);
        }

        if (game.playtime_2weeks && game.playtime_2weeks > 0) {
          rawActivities.push({
            nombre: "PLAYTIME",
            descripcion: `Jugaste ${Math.round(game.playtime_2weeks / 60)} horas`,
            juego: game.name,
            fecha: new Date().toLocaleDateString('es-AR')
          });
        }

        totalPlaytime2Weeks += game.playtime_2weeks || 0;

        return {
          appid,
          name: game.name,
          icon: `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${game.img_icon_url}.jpg`,
          header: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
          playtime_forever: game.playtime_forever,
          playtime_2weeks: game.playtime_2weeks || 0,
          rtime_last_played: game.rtime_last_played,
          last_played_date: game.rtime_last_played && game.rtime_last_played > 0
            ? new Date(game.rtime_last_played * 1000).toISOString().split('T')[0]
            : null,
          tags,
          achievements,
          achievements_unlocked: achievementsUnlocked,
          achievements_total: achievementsTotal,
          achievements_progress: `${achievementsUnlocked}/${achievementsTotal}`
        };
      })
    );

    ownedGames.forEach((game: any) => {
      totalPlaytimeForever += game.playtime_forever;
      if (game.rtime_last_played >= thirtyDaysAgo) {
        recentAddedGames++;
      }
    });

    let actividadReciente: any[] | string = [];
    if (rawActivities.length > 0) {
      const actividadPrompt = `
        A partir de estos datos:
        ${JSON.stringify(rawActivities)}

        Genera una lista JSON que incluya:
        - "PLAYTIME" solo si ya está.
        - "LOGRO DESBLOQUEADO" solo si ya está.
        - Además, analiza y genera uno o más "HITO DESBLOQUEADO" realistas,
          basados en el total jugado o logros, con una frase motivadora.
        Si no puedes generar hitos nuevos, devuelve solo lo que haya.
        Formato:
        [
          {
            "nombre": "PLAYTIME",
            "descripcion": "Jugaste 5 horas esta semana",
            "juego": "Rust",
            "fecha": "23/07/2025"
          },
          {
            "nombre": "HITO DESBLOQUEADO",
            "descripcion": "Completaste una sesión larga",
            "juego": "Rust",
            "fecha": "23/07/2025"
          }
        ]
        Responde SOLO con JSON en español.
      `;

      try {
        const actividadGenerada = await generateContentWithRetry(actividadPrompt);
        let actividadRaw = actividadGenerada?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        actividadRaw = actividadRaw.replace(/```(json|python)?/gi, "").trim();

        const jsonMatch = actividadRaw.match(/\[.*\]/s);
        if (jsonMatch) {
          actividadReciente = JSON.parse(jsonMatch[0]);
        } else if (actividadRaw) {
          console.warn("⚠️ No se pudo parsear JSON, devolviendo texto IA");
          actividadReciente = actividadRaw;
        } else {
          console.warn("⚠️ No hay texto IA, usando rawActivities tal cual");
          actividadReciente = rawActivities;
        }
      } catch (err) {
        console.warn("❗ Error generando actividad IA:", err);
        actividadReciente = rawActivities;
      }
    } else {
      actividadReciente = [];
    }

    const tagsRecientes = recentWithDetails.flatMap(g => g.tags).filter(Boolean);
    const tagsUnicos = Array.from(new Set(tagsRecientes));

    const recomendadosPrompt = `
      Basado en estos géneros: ${tagsUnicos.join(', ')}
      Recomienda 3 juegos Steam, formato:
      [
        {
          "nombre": "DayZ",
          "tags": "Basado en tu amor por supervivencia",
          "descripcion": "Sobrevive con amigos en un mundo abierto peligroso.",
          "header_image": "https://cdn.cloudflare.steamstatic.com/steam/apps/221100/header.jpg"
        }
      ]
      Responde SOLO con JSON en español.
    `;
    let recomendadosIA: any[] = [];
    try {
      const recomendadosGenerados = await generateContentWithRetry(recomendadosPrompt);
      let recomendadosRaw = recomendadosGenerados?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      recomendadosRaw = recomendadosRaw.replace(/```(json|python)?/gi, "").trim();
      const jsonMatch = recomendadosRaw.match(/\[.*\]/s);
      if (jsonMatch) {
        recomendadosIA = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No se encontró un bloque JSON válido en recomendados");
      }
    } catch (err) {
      console.warn("❗ No se pudo parsear recomendados:", err);
      recomendadosIA = [];
    }

    res.json({
      user: {
        steamid: steamId,
        nickname: user._json.personaname,
        avatar: user._json.avatar,
        last_played: Math.max(...ownedGames.map((g: any) => g.rtime_last_played || 0))
      },
      recentGamesWithDetails: recentWithDetails,
      stats: {
        totalPlaytimeHours: Math.round(totalPlaytimeForever / 60),
        playtimeLast2WeeksHours: Math.round(totalPlaytime2Weeks / 60),
        totalAchievementsUnlocked,
        achievementsUnlockedLast2Weeks: totalAchievementsUnlocked2Weeks,
        totalGames: ownedGames.length,
        gamesAddedLastMonth: recentAddedGames
      },
      actividadRecienteIA: actividadReciente,
      recomendadosIA
    });

  } catch (error) {
    console.error("Error al consultar Steam:", error);
    res.status(500).json({ error: "Error al consultar la API de Steam" });
  }
};

export default { dashboard };
