import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-ZKNCM6D1LM'; // Your Google Analytics tracking ID

export default function Analytics() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.gtag('config', TRACKING_ID);
    
    // Track page view
    ReactGA.gtag('event', 'page_view', {
      page_path: window.location.pathname + window.location.search
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}