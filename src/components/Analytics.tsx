import { useEffect } from 'react';

interface Window {
  vercelAnalytics?: {
    init: () => void;
  };
}

declare const window: Window;

export default function Analytics() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vitals.vercel-insights.com/v1/insights';
    script.async = true;
    script.onload = () => {
      console.log('Analytics script loaded');
      if (window.vercelAnalytics) {
        console.log('Initializing analytics');
        window.vercelAnalytics.init();
      } else {
        console.error('vercelAnalytics not available');
      }
    };
    script.onerror = () => {
      console.error('Failed to load analytics script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}