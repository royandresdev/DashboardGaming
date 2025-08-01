/* eslint-disable @typescript-eslint/no-explicit-any */

// Servicio para obtener y normalizar los datos del dashboard
export interface DashboardData {
  userName: string;
  avatar?: string;
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
  const apiUrl = "http://localhost:3000/api/";

  try {
    const response = await fetch(`${apiUrl}dashboard/steam`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del dashboard");
    }

    const data = await response.json();

    return {
      userName: data.user?.nickname ?? "",
      avatar: data.user?.avatar ?? "",
      activitySummary: {
        totalHours: data.stats?.totalPlaytimeHours ?? 0,
        unlockedAchievements: data.stats?.totalAchievementsUnlocked ?? 0,
        weekHours: data.stats?.playtimeLast2WeeksHours ?? 0,
        totalGames: data.stats?.totalGames ?? 0,
        weekAchievements: data.stats?.achievementsUnlockedLast2Weeks ?? 0,
        weekGames: data.stats?.gamesAddedLastMonth ?? 0,
        lastMonthHours: data.stats?.gamesAddedLastMonth ?? 0,
      },
      recentGames: Array.isArray(data.recentGamesWithDetails)
        ? data.recentGamesWithDetails.map((g: any) => ({
            id: g.id ?? "",
            title: g.title ?? "",
            genres: g.genres ?? [],
            hoursPlayed: g.hoursPlayed ?? 0,
            completed: g.completed ?? 0,
            achievements: g.achievements ?? 0,
            lastSession: g.lastSession ?? "",
            image: g.image ?? "",
          }))
        : [],
      recommendations: Array.isArray(data.recomendadosIA)
        ? data.recomendadosIA.map((r: any) => r.nombre ?? "")
        : [],
      recentActivity: Array.isArray(data.actividadRecienteIA)
        ? data.actividadRecienteIA.map((a: any) => ({
            label: a.nombre ?? "",
            description: a.descripcion ?? "",
          }))
        : [],
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }

  // Normalización
}
