"use client";
import { useState } from "react";
import Image from "next/image";

type ProfileNavBarProps = {
  serializedData?: string;
};
export const ProfileNavBar = ({ serializedData }: ProfileNavBarProps) => {
  const { name, avatarUrl } = JSON.parse(serializedData ?? "");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 text-black">
      <div className="p-4 flex flex-row items-center justify-between">
        <a
          href="#"
          className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
        >
          your profile
        </a>
        <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
            <path
              x-show="!open"
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
            <path
              x-show="open"
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
        <div className="relative">
          <button
            onMouseOver={() => setShowMenu(true)}
            className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm 
        font-semibold text-left bg-transparent hover:bg-gray-200 md:w-auto md:inline md:mt-0 md:ml-4 
         focus:bg-blue-800 focus:outline-none focus:shadow-outline"
          >
            <span className="text-black">{name}</span>
            <Image className="inline h-6 rounded-full" src={avatarUrl} width={24} height={24} alt="user" />
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="inline w-4 h-4 transition-transform duration-200 transform"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {showMenu && (
            <div
              onMouseOver={() => setShowMenu(true)}
              onMouseOut={() => setShowMenu(false)}
              onClick={() => setShowMenu(false)}
              className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
            >
              <div className="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">
                <a
                  className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Settings
                </a>
                <a
                  className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Help
                </a>
                <div className="border-b"></div>
                <a
                  className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
