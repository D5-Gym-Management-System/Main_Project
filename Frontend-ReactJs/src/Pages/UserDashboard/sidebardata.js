import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    componentName: 'home' // Add componentName
  },
  {
    title: 'Cart',
    path: '', // Provide a path if necessary
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    componentName: 'cart'
  },
  {
    title: 'Products',
    path: '', // Provide a path if necessary
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    componentName: 'products'
  },
  {
    title: 'Profile',
    path: '', // Provide a path if necessary
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    componentName: 'profile'
  },
  {
    title: 'Messages',
    path: '',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    componentName: 'messages'
  },
  {
    title: 'Support',
    path: '',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    componentName: 'support'
  },
  {
    title: 'Logout',
    path: '',
    icon: <IoIcons.IoIosLogOut />,
    cName: 'nav-text',
    componentName: 'logout'
  }
];
