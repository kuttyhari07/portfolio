import React from 'react';
import { motion } from 'framer-motion';

const SkillProgressBar = ({ skill, index }) => {
  const skillIcons = {
    JavaScript: '📜',
    React: '⚛️',
    'Node.js': '🟢',
    MongoDB: '🍃',
    Python: '🐍',
    HTML5: '🌐',
    CSS3: '🎨',
    'Tailwind CSS': '🎯',
    Git: '📊',
    Express: '🚂',
    default: '💻',
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skillIcons[skill.name] || skillIcons.default}</span>
          <h3 className="font-semibold text-lg">{skill.name}</h3>
        </div>
        <span className="text-blue-400 font-semibold">{skill.percentage}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.percentage}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillProgressBar;