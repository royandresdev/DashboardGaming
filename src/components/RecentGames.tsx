import React from 'react';
interface Game {
  id: string;
  title: string;
  genres: string[];
  hoursPlayed: number;
  completed: number;
  achievements: number;
  lastSession: string;
  image: string;
}
interface Props { games: Game[] }
const RecentGames: React.FC<Props> = ({ games }) => (
  <section>
    <h2 className="text-lg font-semibold mb-4">Juegos recientes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {games.map(game => (
        <div key={game.id} className="bg-[#232733] rounded-xl shadow-md border border-gray-800 p-4 flex flex-col gap-2">
          <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-lg mb-2" />
          <div className="text-base font-bold text-white mb-1">{game.title}</div>
          <div className="flex gap-2 mb-1">
            {game.genres.map(g => <span key={g} className="bg-[#232733] text-xs text-purple-300 px-2 py-0.5 rounded-full border border-purple-700">{g}</span>)}
          </div>
          <div className="text-xs text-gray-400">{game.hoursPlayed} horas jugadas</div>
          <div className="text-xs text-gray-400">Completado {game.completed}%</div>
          <div className="text-xs text-gray-400">Logros {game.achievements}/0</div>
          <div className="text-xs text-gray-400">Última sesión {game.lastSession}</div>
        </div>
      ))}
    </div>
  </section>
);
export default RecentGames;
