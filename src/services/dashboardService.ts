// Servicio para obtener y normalizar los datos del dashboard
export interface DashboardData {
  userName: string;
  activitySummary: {
    totalHours: number;
    unlockedAchievements: number;
    weekHours: number;
    totalGames: number;
    weekAchievements: number;
    weekGames: number;
    lastMonthHours: number;
  };
  recentGames: Array<{
    id: string;
    title: string;
    genres: string[];
    hoursPlayed: number;
    completed: number;
    achievements: number;
    lastSession: string;
    image: string;
  }>;
  recommendations: string[];
  recentActivity: Array<{
    label: string;
    description: string;
  }>;
}

// Simulación de llamada a API y normalización
export async function fetchDashboardData(): Promise<DashboardData> {
  // Simular datos crudos de API
  const apiRaw = {
    user: { name: "RoyAndres" },
    summary: {
      total_hours: 972,
      unlocked_achievements: 156,
      week_hours: 26,
      total_games: 40,
      week_achievements: 5,
      week_games: 1,
      last_month_hours: 15,
    },
    recent_games: [
      {
        id: "repo",
        title: "R.E.P.O",
        genres: ["Horror", "Online Co-op"],
        hours_played: 38.1,
        completed: 0,
        achievements: 0,
        last_session: "Hoy",
        image: "/public/repo.jpg",
      },
      {
        id: "seaofthieves",
        title: "Sea of thieves",
        genres: ["Horror", "Online Co-op"],
        hours_played: 38.1,
        completed: 0,
        achievements: 0,
        last_session: "Hoy",
        image: "/public/seaofthieves.jpg",
      },
      {
        id: "theforest",
        title: "The Forest",
        genres: ["Horror", "Online Co-op"],
        hours_played: 38.1,
        completed: 0,
        achievements: 0,
        last_session: "Hoy",
        image: "/public/theforest.jpg",
      },
      {
        id: "raft",
        title: "RAFT",
        genres: ["Horror", "Online Co-op"],
        hours_played: 38.1,
        completed: 0,
        achievements: 0,
        last_session: "Hoy",
        image: "/public/raft.jpg",
      },
    ],
    recommendations: ["Sugerencias IA. RECOMENDACION DE JUEGOS"],
    recent_activity: [{ label: "Label", description: "Actividad reciente" }],
  };

  // Normalización
  return {
    userName: apiRaw.user.name,
    activitySummary: {
      totalHours: apiRaw.summary.total_hours,
      unlockedAchievements: apiRaw.summary.unlocked_achievements,
      weekHours: apiRaw.summary.week_hours,
      totalGames: apiRaw.summary.total_games,
      weekAchievements: apiRaw.summary.week_achievements,
      weekGames: apiRaw.summary.week_games,
      lastMonthHours: apiRaw.summary.last_month_hours,
    },
    recentGames: apiRaw.recent_games.map((g) => ({
      id: g.id,
      title: g.title,
      genres: g.genres,
      hoursPlayed: g.hours_played,
      completed: g.completed,
      achievements: g.achievements,
      lastSession: g.last_session,
      image: g.image,
    })),
    recommendations: apiRaw.recommendations,
    recentActivity: apiRaw.recent_activity.map((a) => ({
      label: a.label,
      description: a.description,
    })),
  };
}
