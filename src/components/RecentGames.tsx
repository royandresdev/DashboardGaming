import type { FC } from 'react';
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
const RecentGames: FC<Props> = ({ games }) => (
  <section>
    <h2 className="text-lg font-semibold mb-4">Juegos recientes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {games.map(game => (
        <div key={game.id} className="card p-4 gap-2">
          <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-lg mb-2" />
          <div className="text-base font-bold text-white mb-1">{game.title}</div>
          <div className="flex gap-2 mb-1">
            {game.genres.map(g => <span key={g} className="bg-[#232733] text-xs text-purple-300 px-2 py-0.5 rounded-full border border-purple-700">{g}</span>)}
          </div>
          <div className="text-xs text-gray-400">{game.hoursPlayed} horas jugadas</div>
          <p className="text-xs text-gray-400 w-full flex items-center justify-between">
            Completado <span className='text-white'>{game.completed}%</span>
          </p>
          {/* Barra de porcentaje */}
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-pink-500 rounded-full transition-all"
              style={{ width: `${game.completed}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 flex items-center justify-between">
            Logros <span className='text-white'>{game.achievements}/0</span>
          </p>
          <p className="text-xs text-gray-400 flex items-center justify-between">
            Última sesión <span className='text-white'>{game.lastSession}</span>
          </p>
        </div>
      ))}
    </div>
  </section>
);
export default RecentGames;
