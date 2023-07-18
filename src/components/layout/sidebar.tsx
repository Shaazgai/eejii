import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Sidebar: React.FC<Props> = ({ setOpen, open }) => {
  return (
    <div
      className={`
        sidebar top-0 bottom-0 h-full lg:left-0 px-3  overflow-y-auto text-center backdrop-blur-3xl z-30 
        flex flex-col justify-between
        pb-10
        no-scrollbar
        w-screen
        sm:w-[300px]
        ${open ? '' : 'hidden'}
      `}
      id="sidebar"
    >
      <div className="text-xl">
        <div className="h-[50px] flex items-center sm:justify-center justify-between">
          <HamburgerMenuIcon
            width={30}
            height={30}
            onClick={() => setOpen(!open)}
            className="sm:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
