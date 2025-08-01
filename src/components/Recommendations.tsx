import type { FC } from 'react';
import type { Recommendation } from '../types';
interface Props { recommendations: Recommendation[] }
const Recommendations: FC<Props> = ({ recommendations }) => (
  <section className="h-fit">
    <h2 className="text-lg font-semibold mb-4">Recomendados para vos</h2>
    <div className="bg-[#232733] rounded-xl shadow-md border border-gray-800 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {recommendations.map((rec, idx) => (
        <div key={idx} className="text-gray-300 text-base p-4">
          <img src={rec.header_image} alt={rec.nombre} className="w-full h-32 object-cover rounded-lg mb-2" />
          <div className="text-base font-bold text-white mb-1">{rec.nombre}</div>
          <div className="text-xs tag mb-2">{rec.tags}</div>
          <p className="text-xs text-gray-400">{rec.descripcion}</p>
        </div>
      ))}
    </div>
  </section>
);
export default Recommendations;
