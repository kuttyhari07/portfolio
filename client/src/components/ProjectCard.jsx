import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-500 text-xs rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 gradient-text">{project.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 4).map((tech, i) => (
            <span key={i} className="px-2 py-1 text-xs bg-white/10 rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2 py-1 text-xs bg-white/10 rounded-full">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <div className="flex gap-4">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;