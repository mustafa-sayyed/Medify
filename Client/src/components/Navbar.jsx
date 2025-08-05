import React from "react";

function Navbar() {

  return (
    <div className="fixed w-full z-50 mt-5">
      <div className="h-[70px] mx-auto max-w-11/12 sm:max-w-10/12 backdrop-blur-sm border border-gray-500 rounded-xl ">
        <div className="flex justify-around items-center h-full w-full">
          <div className="w-1/3 ">
            <p className="tracking-wider font-bold italic text-3xl text-shadow-2xs text-shadow-white">Medify</p>
          </div>
          <div className="sm:flex items-center gap-12 hidden text-neutral-400">
            <a className="hover:text-neutral-50 cursor-pointer">Home</a>
            <a className="hover:text-neutral-50 cursor-pointer">Features</a>
            <button className="px-6 py-2 rounded-md text-black font-medium cursor-pointer bg-gradient-to-br from-gray-400 to-cyan-500">Login</button>
          </div>
            <button className="px-6 py-2 rounded-md text-black font-medium cursor-pointer bg-gradient-to-br from-gray-400 to-cyan-500 sm:hidden">Login</button>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
