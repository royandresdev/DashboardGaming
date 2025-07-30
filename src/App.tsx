import { useEffect, useState } from 'react';
import type { DashboardData } from './services/dashboardService';
import { fetchDashboardData } from './services/dashboardService';
import NavBar from './components/NavBar';
import ActivitySummary from './components/ActivitySummary';
import RecentGames from './components/RecentGames';
import Recommendations from './components/Recommendations';
import RecentActivity from './components/RecentActivity';

function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then((normalizedData) => {
      setData(normalizedData);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#181c23] text-white font-sans">
      <NavBar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Saludo personalizado */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-pink-600 rounded flex items-center justify-center text-xl font-bold shadow-lg">
            <span>🎮</span>
          </div>
          <span className="text-lg font-semibold">¡Hola, {data.userName}!</span>
        </div>

        {/* Resumen de actividad */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ActivitySummary summary={data.activitySummary} />
        </div>
        {/* Juegos recientes y recomendaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RecentGames games={data.recentGames} />
          </div>
          <Recommendations recommendations={data.recommendations} />
        </div>
        {/* Actividad reciente */}
        <div className="grid grid-cols-1 gap-6">
          <RecentActivity activity={data.recentActivity} />
        </div>
      </div>
    </div>
  );
}

export default App;
