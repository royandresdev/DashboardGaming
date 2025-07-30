import React from 'react';
interface Activity {
  label: string;
  description: string;
}
interface Props { activity: Activity[] }
const RecentActivity: React.FC<Props> = ({ activity }) => (
  <section>
    <h2 className="text-lg font-semibold mb-4">Actividad reciente</h2>
    <div className="bg-[#232733] rounded-xl shadow-md border border-gray-800 p-8 flex flex-col items-center justify-center min-h-[120px]">
      {activity.map((a, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <span className="bg-purple-900 text-purple-300 text-xs px-3 py-1 rounded-full mb-2">{a.label}</span>
          <span className="text-gray-300 text-base">{a.description}</span>
        </div>
      ))}
    </div>
  </section>
);
export default RecentActivity;
