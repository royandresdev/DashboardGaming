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
  <section className='flex flex-col flex-1'>
    <h2 className="text-lg font-semibold mb-4">Juegos recientes</h2>
    <div className={`grid grid-cols-1 gap-6 rounded-xl ${games.length < 1 ? 'h-full w-full bg-[#232733] md:grid-cols-1' : 'md:grid-cols-2'}`}>
      {
        games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="bg-[#232733] rounded-lg shadow-md p-4 flex flex-col gap-2">
              <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h3 className="text-base font-bold text-white">{game.title}</h3>
              <div className="text-xs text-gray-400 mb-1">Géneros: {game.genres.join(', ')}</div>
              <div className="text-xs text-gray-400">Horas jugadas: {game.hoursPlayed}</div>
              <div className="text-xs text-gray-400">Completado: {game.completed}%</div>
              <div className="text-xs text-gray-400">Logros: {game.achievements}</div>
              <div className="text-xs text-gray-400">Última sesión: {game.lastSession}</div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-500">
            <p>No haz jugado ningún juego recientemente.</p>
          </div>
        )
      }
    </div>
  </section>
);
export default RecentGames;
