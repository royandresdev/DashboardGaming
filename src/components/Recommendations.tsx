import React from 'react';
interface Props { recommendations: string[] }
const Recommendations: React.FC<Props> = ({ recommendations }) => (
  <section className="h-fit lg:h-full">
    <h2 className="text-lg font-semibold mb-4">Recomendados para vos</h2>
    <div className="bg-[#232733] rounded-xl shadow-md border border-gray-800 h-full flex items-center justify-center">
      {recommendations.map((rec, idx) => (
        <div key={idx} className="text-gray-300 text-center text-base px-4 py-8 w-full">
          {rec}
        </div>
      ))}
    </div>
  </section>
);
export default Recommendations;
