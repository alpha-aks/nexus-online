declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: string, ...args: any[]) => void;
  }
}