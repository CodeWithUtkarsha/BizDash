import { motion } from 'framer-motion';

export const FlowingBackground = () => {
  return (
    <div className="flowing-bg fixed inset-0">
      <div className="flowing-lines">
        <motion.div 
          className="flowing-line"
          initial={{ x: '-100%', skewX: -15 }}
          animate={{ x: '100%', skewX: -15 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div 
          className="flowing-line"
          style={{ top: '20%', height: '1px' }}
          initial={{ x: '-100%', skewX: -15 }}
          animate={{ x: '100%', skewX: -15 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
            delay: -5
          }}
        />
        <motion.div 
          className="flowing-line"
          style={{ top: '60%', height: '3px' }}
          initial={{ x: '-100%', skewX: -15 }}
          animate={{ x: '100%', skewX: -15 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
            delay: -10
          }}
        />
        <motion.div 
          className="flowing-line"
          style={{ top: '80%', height: '1px' }}
          initial={{ x: '-100%', skewX: -15 }}
          animate={{ x: '100%', skewX: -15 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
            delay: -7
          }}
        />
      </div>
    </div>
  );
};

export const CursorGlow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', x + '%');
    e.currentTarget.style.setProperty('--mouse-y', y + '%');
  };

  return (
    <div 
      className={`cursor-glow ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};
