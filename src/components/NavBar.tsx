import { Icon } from "@iconify/react";

const NavBar = () => (
  <nav className="w-full py-4 px-8 flex flex-col gap-2">
    <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
      <div className="flex items-center gap-2 text-xl">
        <Icon icon="token:gamefi" className="text-5xl" /> <span>GameStats</span>
      </div>
      <div className="flex items-center gap-4">
        <a
          className="border block border-[#D732A8] bg-[#211C40] w-[189px] py-1 rounded-lg text-center"
          href="#"
        >
          Dashboard
        </a>
        <a
          className="border block border-transparent w-[189px] py-1 rounded-lg text-center"
          href="#"
        >
          Mi biblioteca
        </a>
        <a
          className="border block border-transparent w-[189px] py-1 rounded-lg text-center"
          href="#"
        >
          Configuración
        </a>
      </div>
      <div></div>
    </div>
  </nav>
);
export default NavBar;
