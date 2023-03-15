import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill, BsEmojiSunglasses } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import useCurrentUser from '../../hooks/useCurrentUser';

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
  
    const items = [
      {
        icon: BsHouseFill,
        label: 'Home',
        href: '/',
      },
      {
        icon: BsBellFill,
        label: 'Notifications',
        href: '/notifications',
        auth: true,
        alert: currentUser?.hasNotification
      },
      {
        icon: FaUser,
        label: 'Profile',
        href: `/users/${currentUser?.id}`,
        auth: true,
      },
    ]
  
    return (
      <div className="col-span-1 h-full pr-4 md:pr-6">
          <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[230px]">
              <SidebarLogo />

              {/* Conditional rendering of the message */}
              {currentUser && (
                <div className="text-white text-xl mb-2">
                  Hi {currentUser.name}!
                </div>
              )}

              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  alert={item.alert}
                  auth={item.auth}
                  href={item.href} 
                  icon={item.icon} 
                  label={item.label}
                />
              ))}
              {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
              <SidebarTweetButton />
            </div>
          </div>
        </div>
    )
  };
  
  export default Sidebar;
  