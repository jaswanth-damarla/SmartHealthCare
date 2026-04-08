import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This snaps the view to the top-left of the page
    window.scrollTo(0, 0);
  }, [pathname]); // This runs every time the URL path changes

  return null; // This component doesn't render anything visually
};

export default ScrollToTop;