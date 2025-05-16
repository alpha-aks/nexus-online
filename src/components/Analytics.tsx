import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-ZKNCM6D1LM'; // Your Google Analytics tracking ID

// Declare CMP type
declare global {
  interface Window {
    CMP?: {
      getConsentData: () => Promise<{ consent: boolean }>;
    };
  }
}

export default function Analytics() {
  useEffect(() => {
    // Check if consent is given before initializing GA
    const checkConsentAndInitialize = () => {
      try {
        // Check if CMP is loaded
        if (typeof window.CMP !== 'undefined') {
          window.CMP.getConsentData().then((consentData) => {
            if (consentData && consentData.consent) {
              // Initialize GA only if consent is given
              ReactGA.initialize(TRACKING_ID);
              ReactGA.gtag('config', TRACKING_ID);
              
              // Track page view
              ReactGA.gtag('event', 'page_view', {
                page_path: window.location.pathname + window.location.search
              });
            }
          });
        } else {
          // If CMP is not loaded yet, set a timeout to check again
          setTimeout(checkConsentAndInitialize, 1000);
        }
      } catch (error) {
        console.error('Error checking consent:', error);
      }
    };

    // Initial check
    checkConsentAndInitialize();

    // Cleanup function
    return () => {
      // Clear any pending timeouts
      const checkInterval = setInterval(checkConsentAndInitialize, 1000);
      clearInterval(checkInterval);
    };
  }, []); // Empty dependency array since we only want to run this once

  return null;
}
