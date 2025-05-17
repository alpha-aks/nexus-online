import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
        />
        <span className="text-white">Loading...</span>
      </motion.div>
    </div>
  );
}
