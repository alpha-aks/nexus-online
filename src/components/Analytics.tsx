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
      if (window.vercelAnalytics) {
        window.vercelAnalytics.init();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}