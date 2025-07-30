import React from 'react';
interface Props {
  summary: {
    totalHours: number;
    unlockedAchievements: number;
    weekHours: number;
    totalGames: number;
    weekAchievements: number;
    weekGames: number;
    lastMonthHours: number;
  }
}
const cardClass = "bg-[#232733] rounded-xl p-6 flex flex-col gap-1 shadow-md border border-gray-800 relative";
const iconClass = "absolute top-4 right-4 text-cyan-400 text-xl";
const ActivitySummary: React.FC<Props> = ({ summary }) => (
  <>
    <div className={cardClass}>
      <span className={iconClass}>🕒</span>
      <div className="text-sm text-gray-400">Horas jugadas en total</div>
      <div className="text-2xl font-bold">{summary.totalHours} hs</div>
      <div className="text-xs text-pink-400">+{summary.weekHours} hs esta semana</div>
      <div className="text-xs text-gray-400">En todos tus juegos acumulados.</div>
    </div>
    <div className={cardClass}>
      <span className={iconClass}>🏆</span>
      <div className="text-sm text-gray-400">Logros desbloqueados</div>
      <div className="text-2xl font-bold">{summary.unlockedAchievements}</div>
      <div className="text-xs text-pink-400">+{summary.weekAchievements} esta semana</div>
      <div className="text-xs text-gray-400">Avances en tus juegos.</div>
    </div>
    <div className={cardClass}>
      <span className={iconClass}>📅</span>
      <div className="text-sm text-gray-400">Tiempo jugado esta semana</div>
      <div className="text-2xl font-bold">{summary.weekHours} hs</div>
      <div className="text-xs text-pink-400">+{summary.lastMonthHours} min vs. el ultimo mes</div>
      <div className="text-xs text-gray-400">Promedio semanal en todos tus juegos.</div>
    </div>
    <div className={cardClass}>
      <span className={iconClass}>🎮</span>
      <div className="text-sm text-gray-400">Total de juegos</div>
      <div className="text-2xl font-bold">{summary.totalGames}</div>
      <div className="text-xs text-pink-400">+{summary.weekGames} juego este mes</div>
      <div className="text-xs text-gray-400">Juegos que tenés en tu cuenta de Steam</div>
    </div>
  </>
);
export default ActivitySummary;
