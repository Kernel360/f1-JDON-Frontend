import { useEffect } from 'react';
import './Layout.scss';

export function Layout({ children }) {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return <div className="layout">{children}</div>;
}
