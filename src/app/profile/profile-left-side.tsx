import Image from "next/image";
import { useMemo } from "react";

type ProfileLeftSideProps = {
  avatarUrl: string;
  textIntroduction: string;
  name: string;
  memberSince: string;
};
export const ProfileLeftSide = ({ avatarUrl, textIntroduction, name, memberSince }: ProfileLeftSideProps) => {
  const memberSinceFormatted = useMemo(() => {
    const date = new Date(memberSince);
    return Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
  }, [memberSince]);
  return (
    <div className="w-full md:w-3/12 md:mx-2">
      {/* Profile Card  */}
      <div className="flex flex-col items-center bg-white p-3 border-t-4 border-green-400">
        <div className="grid place-content-center max-w-[300px] overflow-hidden">
          <Image className="h-auto w-full mx-auto" src={avatarUrl} width={200} height={200} alt="" />
        </div>
        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{name}</h1>
        <h3 className="text-gray-600 text-lg font-semibold leading-6">Tech Industry</h3>
        <p className="text-sm text-gray-500 text-start hover:text-gray-600 leading-6">{textIntroduction}</p>
        <ul className="w-full bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
          <li className="flex items-center py-3">
            <span>Status</span>
            <span className="ml-auto">
              <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
            </span>
          </li>
          <li className="flex items-center py-3">
            <span>Member since</span>
            <span className="ml-auto">{memberSinceFormatted}</span>
          </li>
        </ul>
      </div>
      {/* End of profile card  */}
      <div className="my-4"></div>
      {/* Friends card  */}
      <div className="bg-white p-3 hover:shadow">
        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
          <span className="text-green-500">
            <svg
              className="h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
          <span>Similar Profiles</span>
        </div>
        <div className="grid grid-cols-3">
          <div className="text-center my-2">
            <Image
              className="h-16 w-16 rounded-full mx-auto"
              src="https://i.pravatar.cc/65"
              width={100}
              height={100}
              alt=""
            />
            <a href="#" className="text-main-color">
              Kojstantin
            </a>
          </div>
          <div className="text-center my-2">
            <Image
              className="h-16 w-16 rounded-full mx-auto"
              src="https://i.pravatar.cc/60"
              width={100}
              height={100}
              alt=""
            />
            <a href="#" className="text-main-color">
              James
            </a>
          </div>
          <div className="text-center my-2">
            <Image
              className="h-16 w-16 rounded-full mx-auto"
              src="https://i.pravatar.cc/50"
              width={100}
              height={100}
              alt=""
            />
            <a href="#" className="text-main-color">
              Natie
            </a>
          </div>
          <div className="text-center my-2">
            <Image
              className="h-16 w-16 rounded-full mx-auto"
              src="https://i.pravatar.cc/55"
              width={100}
              height={100}
              alt=""
            />
            <a href="#" className="text-main-color">
              Casey
            </a>
          </div>
        </div>
      </div>
      {/* End of friends card  */}
    </div>
  );
};
