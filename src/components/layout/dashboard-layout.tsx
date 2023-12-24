import {
  Bell,
  ChevronRight,
  HeartHandshake,
  Home,
  LayoutGrid,
  PartyPopper,
  Tag,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <Home />,
      items: [],
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: <Users />,
      items: [],
    },
    {
      title: 'Events',
      href: '/admin/events',
      icon: <PartyPopper />,
      items: [],
    },
    {
      title: 'Projects',
      href: '/admin/projects',
      icon: <HeartHandshake />,
      items: [],
    },
    {
      title: 'Category',
      href: '/admin/category',
      icon: <Tag />,
      items: [],
    },
  ];

  return (
    <>
      <div className="fixed z-30 flex h-16 w-full items-center justify-center border-b border-b-gray-200 bg-white p-2 px-10 dark:bg-[#0F172A]">
        <div
          className={`logo  ${
            isSidebarOpen ? '' : 'ml-12'
          } flex h-full flex-none transform items-center justify-center duration-300 ease-in-out dark:text-white`}
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

            <div className="hidden text-sm text-black dark:text-white md:block md:text-md">
              John Doe
            </div>
          </div>
        </div>
      </div>
      <aside
        className={`fixed z-50 flex h-screen w-60 ${
          isSidebarOpen ? 'translate-x-none' : '-translate-x-48'
        } transform bg-[#1E293B] transition duration-300 ease-in-out`}
      >
        {/* < />!-- open sidebar button --> */}
        <div
          className={`max-toolbar absolute -right-6 top-2 flex h-12 w-full ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-24 scale-x-0'
          } transform items-center justify-between rounded-full border-2 border-white bg-[#1E293B]  transition duration-300 ease-in-out dark:border-[#0F172A]`}
        >
          <div className="flex items-center space-x-2 pl-4 ">
            {/*
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
            */}
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
          className="absolute -right-6 top-2 flex transform rounded-full border-2 border-white bg-[#1E293B] p-3 text-white transition duration-500 ease-in-out hover:rotate-45 hover:bg-purple-500 dark:border-[#0F172A] dark:hover:bg-blue-500"
        >
          <LayoutGrid />
        </div>
        {/* < />!-- MAX SIDEBAR--> */}
        <div
          className={`max mt-20 ${
            isSidebarOpen ? 'flex' : 'hidden'
          } h-[calc(100vh)] w-full flex-col space-y-2 text-white`}
        >
          {menuItems.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="flex w-full transform flex-row items-center space-x-3 rounded-full bg-[#1E293B] p-2 pl-8 text-white duration-300 ease-in-out  hover:text-purple-500 dark:hover:text-blue-500"
            >
              {item.icon ?? <ChevronRight />}
              <div>{item.title}</div>
            </Link>
          ))}
        </div>
        {/* < />!-- MINI SIDEBAR--> */}
        <div
          className={`mini mt-20 ${
            isSidebarOpen ? 'hidden' : 'flex'
          } h-[calc(100vh)] w-full flex-col space-y-2`}
        >
          {menuItems.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="flex w-full transform justify-end rounded-full bg-[#1E293B] p-3 text-white duration-300 ease-in-out hover:text-purple-500 dark:hover:text-blue-500"
            >
              {item.icon ?? <ChevronRight />}
            </Link>
          ))}
        </div>
      </aside>
      <div
        className={`content ${
          isSidebarOpen ? 'ml-12 md:ml-60' : 'ml-12'
        } ml-12 transform px-2 pb-4 pt-20 duration-300 ease-in-out md:px-5 `}
      >
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
