import React from 'react';
interface Props { userName: string }
const NavBar: React.FC<Props> = ({ userName }) => (
  <nav className="w-full bg-[#232733] py-4 px-8 flex flex-col gap-2 border-b border-gray-800">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-pink-600 rounded flex items-center justify-center text-xl font-bold shadow-lg">
        <span>🎮</span>
      </div>
      <span className="text-lg font-semibold">¡Hola, {userName}!</span>
    </div>
    <div className="text-center text-sm text-gray-400 tracking-wide">Nav bar</div>
  </nav>
);
export default NavBar;
