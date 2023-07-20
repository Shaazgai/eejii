import { Bell, Grape, Home, LayoutGrid, Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const setDark = (val: string) => {
    if (val === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      <div className="fixed z-30 flex h-16 w-full items-center justify-center bg-white p-2 px-10 dark:bg-[#0F172A]">
        <div
          className={`logo  ${
            isSidebarOpen ? '' : 'ml-12'
          } flex h-full flex-none transform items-center justify-center duration-500 ease-in-out dark:text-white`}
        >
          Eejii
        </div>

        <div className="flex h-full grow items-center justify-center"></div>
        <div className="flex h-full flex-none items-center justify-center text-center">
          <div className="flex items-center space-x-3 px-3">
            <div className="flex flex-none justify-center">
              <div className="flex h-8 w-8 ">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                  alt="profile"
                  className="rounded-full object-cover shadow"
                />
              </div>
            </div>

            <div className="md:text-md hidden text-sm text-black dark:text-white md:block">
              John Doe
            </div>
          </div>
        </div>
      </div>
      <aside
        className={`fixed z-50 flex h-screen w-60 ${
          isSidebarOpen ? 'translate-x-none' : '-translate-x-48'
        } transform bg-[#1E293B] transition duration-1000 ease-in-out`}
      >
        {/* < />!-- open sidebar button --> */}
        <div
          className={`max-toolbar absolute -right-6 top-2 flex h-12 w-full ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-24 scale-x-0'
          } transform items-center justify-between rounded-full border-4 border-white bg-[#1E293B]  transition duration-300 ease-in dark:border-[#0F172A]`}
        >
          <div className="flex items-center space-x-2 pl-4 ">
            <div>
              <div
                onClick={() => setDark('dark')}
                className={`moon text-white hover:text-blue-500 dark:hover:text-[#38BDF8] ${
                  isDark && 'hidden'
                }`}
              >
                <Moon />
              </div>
              <div
                onClick={() => setDark('light')}
                className={`sun text-white hover:text-blue-500 dark:hover:text-[#38BDF8] ${
                  !isDark && 'hidden'
                }`}
              >
                <Sun />
              </div>
            </div>
            <div className="text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
              <Bell />
            </div>
          </div>
          <div className="group flex items-center space-x-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 py-1  pl-10 pr-2 text-white dark:from-cyan-500 dark:to-blue-500  ">
            <div className="mr-12 transform duration-300 ease-in-out">
              Eejii
            </div>
          </div>
        </div>
        <div
          onClick={toggleSidebar}
          className="absolute -right-6 top-2 flex transform rounded-full border-4 border-white bg-[#1E293B] p-3 text-white transition duration-500 ease-in-out hover:rotate-45 hover:bg-purple-500 dark:border-[#0F172A] dark:hover:bg-blue-500"
        >
          <LayoutGrid />
        </div>
        {/* < />!-- MAX SIDEBAR--> */}
        <div
          className={`max mt-20 ${
            isSidebarOpen ? 'flex' : 'hidden'
          } h-[calc(100vh)] w-full flex-col space-y-2 text-white`}
        >
          <div className="flex w-full transform flex-row items-center space-x-3 rounded-full bg-[#1E293B] p-2 pl-8 text-white duration-300 ease-in-out  hover:text-purple-500 dark:hover:text-blue-500">
            <Home />
            <div>Home</div>
          </div>
          <div className="flex w-full transform flex-row items-center space-x-3 rounded-full bg-[#1E293B] p-2 pl-8 text-white duration-300 ease-in-out  hover:text-purple-500 dark:hover:text-blue-500">
            <Menu />
            <div>Table</div>
          </div>
          <div className="flex w-full transform flex-row items-center space-x-3 rounded-full bg-[#1E293B] p-2 pl-8 text-white duration-300 ease-in-out  hover:text-purple-500 dark:hover:text-blue-500">
            <Grape />
            <div>Graph</div>
          </div>
        </div>
        {/* < />!-- MINI SIDEBAR--> */}
        <div
          className={`mini mt-20 ${
            isSidebarOpen ? 'hidden' : 'flex'
          } h-[calc(100vh)] w-full flex-col space-y-2`}
        >
          <div className="flex w-full transform justify-end rounded-full bg-[#1E293B] p-3 text-white duration-300 ease-in-out hover:text-purple-500 dark:hover:text-blue-500">
            <Home />
          </div>
          <div className="flex w-full transform justify-end rounded-full bg-[#1E293B] p-3 text-white duration-300 ease-in-out hover:text-purple-500 dark:hover:text-blue-500">
            <Menu />
          </div>
          <div className="flex w-full transform justify-end rounded-full bg-[#1E293B] p-3 text-white duration-300 ease-in-out hover:text-purple-500 dark:hover:text-blue-500">
            <Grape />
          </div>
        </div>
      </aside>
      <div
        className={`content ${
          isSidebarOpen ? 'ml-12 md:ml-60' : 'ml-12'
        } ml-12 transform px-2 pb-4 pt-20 duration-500 ease-in-out md:px-5 `}
      >
        <nav
          className="flex rounded-lg bg-gray-50 px-5  py-3 text-gray-700 dark:bg-[#1E293B] "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a
                  href="#"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2"
                >
                  Templates
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="-mx-2 my-5 flex flex-wrap">
          <div className="w-full p-2 lg:w-1/3">
            <div className="flex w-full flex-row items-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 dark:from-cyan-500 dark:to-blue-500">
              <div className="flex h-8 w-8 flex-none items-center rounded-md bg-white p-2 text-indigo-500 dark:bg-[#0F172A] dark:text-white md:h-12 md:w-12 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="object-scale-down transition duration-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 flex flex-grow flex-col justify-around text-white">
                <div className="whitespace-nowrap text-xs">Total User</div>
                <div className="">100</div>
              </div>
              <div className=" flex flex-none items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full p-2 md:w-1/2 lg:w-1/3 ">
            <div className="flex w-full flex-row items-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 dark:from-cyan-500 dark:to-blue-500">
              <div className="flex h-8 w-8 flex-none items-center rounded-md bg-white p-2 text-indigo-500 dark:bg-[#0F172A] dark:text-white md:h-12 md:w-12 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="object-scale-down transition duration-500 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <div className="ml-5 flex flex-grow flex-col justify-around text-white">
                <div className="whitespace-nowrap text-xs">Total Product</div>
                <div className="">500</div>
              </div>
              <div className=" flex flex-none items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full p-2 md:w-1/2 lg:w-1/3">
            <div className="flex w-full flex-row items-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 dark:from-cyan-500 dark:to-blue-500">
              <div className="flex h-8 w-8 flex-none items-center rounded-md bg-white p-2 text-indigo-500 dark:bg-[#0F172A] dark:text-white md:h-12 md:w-12 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="object-scale-down transition duration-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
              </div>
              <div className="ml-5 flex flex-grow flex-col justify-around text-white">
                <div className="whitespace-nowrap text-xs">Total Visitor</div>
                <div className="">500</div>
              </div>
              <div className=" flex flex-none items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-4 rounded-lg bg-blue-100 p-4 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800"
          role="alert"
        >
          <span className="font-medium">Info alert!</span> Change a few things
          up and try submitting again.
        </div>
        <div
          className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span> Change a few things
          up and try submitting again.
        </div>
        <div
          className="mb-4 rounded-lg bg-green-100 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Success alert!</span> Change a few
          things up and try submitting again.
        </div>
      </div>
    </>
  );
};

export default Index;
