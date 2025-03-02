import React from "react";

const navLinks = [
  {
    title: "Charts",
    url: "/",
  },
  {
    title: "Markets",
    url: "/",
  },
  {
    title: "News",
    url: "/",
  },
  {
    title: "Community",
    url: "/",
  },
  {
    title: "More",
    url: "/",
  },
];

const Navigation = () => {
  return (
    <div className="padding-x max-container flex items-center justify-between pt-[2rem] z-40">
      <div className="flex items-center gap-2 z-40">
        <img src="/assets/svg/logo.svg" alt="Logo" />
        <h2 className="text-white text-[20px] font-bold">CentriTrade</h2>
      </div>

      <div className="flex items-center justify-center gap-6 border-[0.5px] border-[#FFFFFF]/15 w-[470px] h-[48px] rounded-full backdrop-blur-md bg-[#FFFFFF]/15">
        {navLinks.map((link) => (
          <a href={link.url} className="text-white font-medium">
            {link.title}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6 z-40">
        <a className="font-medium text-white cursor-pointer">Login</a>
        <img src="/assets/svg/Link.svg" className="cursor-pointer" alt="Link" />
      </div>
    </div>
  );
};

export default Navigation;
