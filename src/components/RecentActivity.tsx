import type { FC } from 'react';
import type { RecentActivityInterface } from '../types';

interface Props { activity: RecentActivityInterface[] }
const RecentActivity: FC<Props> = ({ activity }) => (
  <section>
    <h2 className="text-lg font-semibold mb-4">Actividad reciente</h2>
    <div className="bg-[#232733] rounded-xl shadow-md border border-gray-800 px-2 py-4 flex flex-col items-start min-h-[120px] h-full">
      {activity.map((a, idx) => (
        <div key={idx} className="p-2">
          <span className="tag mb-1">{a.label}</span>
          <span className="text-gray-300 text-base">{a.description}</span>
          <p className="text-gray-400 text-sm">
            {a.gameName} • {a.date}
          </p>
        </div>
      ))}
    </div>
  </section>
);
export default RecentActivity;
