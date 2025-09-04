import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide loading screen when progress is complete or after 3 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 500);
      
      return () => {
        clearTimeout(timeout);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [progress]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img 
            src="/nexus logo.png" 
            alt="Nexus" 
            className="h-24 w-auto border-2 border-white rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex items-center gap-2"
        >
          <span className="text-sm text-white/50">Preparing To Boost</span>
          <span className="text-sm font-medium text-white">{Math.round(progress)}%</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-64 relative"
        >
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading stats */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white/50 text-sm">
            {progress < 100 ? `Loading... ${Math.round(progress)}%` : 'Ready'}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen