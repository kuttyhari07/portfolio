import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Professional SVG Icons
const SkillIcons = {
  // Frontend
  react: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" stroke="#61DAFB"/>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="#61DAFB" opacity="0.3"/>
      <circle cx="5" cy="12" r="2" fill="#61DAFB" opacity="0.5"/>
      <circle cx="19" cy="12" r="2" fill="#61DAFB" opacity="0.5"/>
      <circle cx="12" cy="5" r="2" fill="#61DAFB" opacity="0.5"/>
      <circle cx="12" cy="19" r="2" fill="#61DAFB" opacity="0.5"/>
    </svg>
  ),
  vue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#42B883" strokeWidth="2">
      <path d="M2 3L12 21L22 3H17L12 12L7 3H2Z" fill="#42B883" stroke="none"/>
      <path d="M7 3L12 12L17 3H12.5L12 4.5L11.5 3H7Z" fill="#35495E" stroke="none"/>
    </svg>
  ),
  angular: (
    <svg viewBox="0 0 24 24" fill="#E23237">
      <path d="M12 2L2 6L3.5 17L12 22L20.5 17L22 6L12 2ZM12 4.5L17.5 7.5L15.5 17.5L12 19L8.5 17.5L6.5 7.5L12 4.5Z"/>
    </svg>
  ),
  html: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 2L6 20L12 22L18 20L20 2H4Z" fill="#E44D26"/>
      <path d="M12 20L16.5 18.5L18 4H12V20Z" fill="#F16529"/>
      <path d="M12 12H9L8.8 9H12V6H5.5L6 12H12V12Z" fill="#EBEBEB"/>
      <path d="M12 17.8L11.5 17.8L9.5 17.2L9.2 15H6.5L7 18L11.5 19L12 18.8V17.8Z" fill="#EBEBEB"/>
      <path d="M12 12V9H17.2L17.5 6H12V3H20.5L20 12H12Z" fill="white"/>
      <path d="M12 19L16.5 17.5L17.2 13.5H14.5L14.2 15.5L12 16.5V19Z" fill="white"/>
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 2L6 20L12 22L18 20L20 2H4Z" fill="#264DE4"/>
      <path d="M12 20L16.5 18.5L18 4H12V20Z" fill="#2965F1"/>
      <path d="M12 12H9L8.8 9H12V6H5.5L6 12H12V12Z" fill="#EBEBEB"/>
      <path d="M12 17.8L11.5 17.8L9.5 17.2L9.2 15H6.5L7 18L11.5 19L12 18.8V17.8Z" fill="#EBEBEB"/>
      <path d="M12 12V9H17.2L17.5 6H12V3H20.5L20 12H12Z" fill="white"/>
      <path d="M12 19L16.5 17.5L17.2 13.5H14.5L14.2 15.5L12 16.5V19Z" fill="white"/>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="#38B2AC">
      <path d="M12 6C9.33 6 7.33 7.33 6 10C7.33 8.67 9 8 11 8.33C12.17 8.58 12.92 9.25 13.75 10.08C15.08 11.42 16.58 12.92 19 12.92C21.67 12.92 23.67 11.58 25 9.25C23.67 10.58 22 11.25 20 10.92C18.83 10.67 18.08 10 17.25 9.17C15.92 7.83 14.42 6.33 12 6Z"/>
      <path d="M6 10.83C3.33 10.83 1.33 12.17 0 14.5C1.33 13.17 3 12.5 5 12.83C6.17 13.08 6.92 13.75 7.75 14.58C9.08 15.92 10.58 17.42 13 17.42C15.67 17.42 17.67 16.08 19 13.75C17.67 15.08 16 15.75 14 15.42C12.83 15.17 12.08 14.5 11.25 13.67C9.92 12.33 8.42 10.83 6 10.83Z"/>
    </svg>
  ),
  bootstrap: (
    <svg viewBox="0 0 24 24" fill="#7952B3">
      <path d="M4 2H20V22H4V2ZM6.5 4V20H17.5V4H6.5ZM9 8H13V10H9V8ZM9 12H14V14H9V12ZM9 16H15V18H9V16Z"/>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" fill="#F7DF1E">
      <path d="M0 0H24V24H0V0Z" fill="none"/>
      <path d="M4 4H20V20H4V4Z" fill="#F7DF1E"/>
      <path d="M14 9H11V15.5C11 16.33 10.33 17 9.5 17C8.67 17 8 16.33 8 15.5" stroke="#000" strokeWidth="2" fill="none"/>
      <path d="M16 14.5C16 15.88 14.88 17 13.5 17C12.12 17 11 15.88 11 14.5" stroke="#000" strokeWidth="2" fill="none"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" fill="#3178C6">
      <path d="M4 4H20V20H4V4Z" fill="#3178C6"/>
      <path d="M7 11H17V13H7V11ZM10 7H14V17H10V7ZM12 7H14V17H12V7Z" fill="white"/>
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="black"/>
      <path d="M16.5 17L10 9.5" stroke="white" strokeWidth="2"/>
      <path d="M16.5 9.5V17" stroke="white" strokeWidth="2"/>
      <path d="M7.5 9.5L7.5 17" stroke="white" strokeWidth="2"/>
    </svg>
  ),

  // Backend
  node: (
    <svg viewBox="0 0 24 24" fill="#68A063">
      <path d="M12 2L2 7L2 17L12 22L22 17L22 7L12 2ZM12 4L19.5 7.5L12 11L4.5 7.5L12 4ZM4.5 8.5L11.5 12L11.5 19L4.5 15.5V8.5ZM19.5 8.5V15.5L12.5 19V12L19.5 8.5Z"/>
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" fill="#000">
      <path d="M24 18.7C23.1 17.2 21.8 16.1 20.2 15.5C21.5 14.8 22.7 13.9 23.6 12.8C24.5 11.7 25 10.4 25 9C25 7.6 24.5 6.3 23.6 5.2C22.7 4.1 21.5 3.2 20.2 2.5V2.5C20.2 4.2 19.8 5.7 19 7C18.2 8.3 17.1 9.3 15.7 10C16.8 10.7 17.7 11.6 18.4 12.8C19.1 14 19.5 15.3 19.5 16.7C19.5 18.1 19.1 19.4 18.4 20.6C17.7 21.8 16.8 22.7 15.7 23.4C16.8 24.1 17.7 25 18.4 26.2C19.1 27.4 19.5 28.7 19.5 30.1C19.5 31.5 19.1 32.8 18.4 34C17.7 35.2 16.8 36.1 15.7 36.8C16.8 37.5 17.7 38.4 18.4 39.6C19.1 40.8 19.5 42.1 19.5 43.5C19.5 44.9 19.1 46.2 18.4 47.4C17.7 48.6 16.8 49.5 15.7 50.2C16.8 50.9 17.7 51.8 18.4 53C19.1 54.2 19.5 55.5 19.5 56.9V56.9C20.8 56.2 22 55.3 22.9 54.2C23.8 53.1 24.3 51.8 24.3 50.4C24.3 49 23.8 47.7 22.9 46.6C22 45.5 20.8 44.6 19.5 43.9V43.9C20.8 43.2 22 42.3 22.9 41.2C23.8 40.1 24.3 38.8 24.3 37.4C24.3 36 23.8 34.7 22.9 33.6C22 32.5 20.8 31.6 19.5 30.9V30.9C20.8 30.2 22 29.3 22.9 28.2C23.8 27.1 24.3 25.8 24.3 24.4C24.3 23 23.8 21.7 22.9 20.6C22 19.5 20.8 18.6 19.5 17.9V17.9C21.1 17.3 22.4 16.2 23.3 14.7C24.2 13.2 24.7 11.5 24.7 9.7C24.7 7.9 24.2 6.2 23.3 4.7C22.4 3.2 21.1 2.1 19.5 1.5V1.5Z"/>
    </svg>
  ),
  django: (
    <svg viewBox="0 0 24 24" fill="#092E20">
      <path d="M9.5 2H12V22H9.5V2ZM15 6H17.5V22H15V6ZM4 6H6.5V22H4V6Z"/>
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="#000">
      <path d="M12 2L2 22H22L12 2ZM12 6L18 18H6L12 6Z"/>
    </svg>
  ),
  spring: (
    <svg viewBox="0 0 24 24" fill="#6DB33F">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6L6 16H18L12 6Z" fill="#6DB33F"/>
    </svg>
  ),
  php: (
    <svg viewBox="0 0 24 24" fill="#777BB4">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#8892BF"/>
      <path d="M9.5 10H8V14H9.5V10ZM12.5 10H11V14H12.5V10Z" fill="white"/>
    </svg>
  ),
  ruby: (
    <svg viewBox="0 0 24 24" fill="#CC342D">
      <path d="M12 2L2 7L12 22L22 7L12 2ZM12 5L18 7.5L12 10L6 7.5L12 5Z"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#3776AB"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#3776AB" opacity="0.8"/>
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="#FFD43B"/>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" fill="#007396">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M8 10L16 10L16 14L8 14L8 10Z" fill="#5382A1"/>
      <path d="M10 8L14 8L14 16L10 16L10 8Z" fill="#E76F00"/>
    </svg>
  ),
  'c++': (
    <svg viewBox="0 0 24 24" fill="#00599C">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
      <path d="M12 11L18 14.5L12 18L6 14.5L12 11Z"/>
    </svg>
  ),
  go: (
    <svg viewBox="0 0 24 24" fill="#00ADD8">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#00ADD8" opacity="0.5"/>
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white"/>
    </svg>
  ),
  rust: (
    <svg viewBox="0 0 24 24" fill="#000">
      <circle cx="12" cy="12" r="10" stroke="#000" strokeWidth="2" fill="none"/>
      <path d="M12 2L12 22" stroke="#000" strokeWidth="2"/>
      <path d="M2 12L22 12" stroke="#000" strokeWidth="2"/>
    </svg>
  ),
  swift: (
    <svg viewBox="0 0 24 24" fill="#FA7343">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#FA7343" opacity="0.5"/>
      <path d="M8 12L16 12" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  kotlin: (
    <svg viewBox="0 0 24 24" fill="#7F52FF">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 2L2 12L12 22V2Z" fill="#7F52FF" opacity="0.5"/>
    </svg>
  ),

  // Database
  mongodb: (
    <svg viewBox="0 0 24 24" fill="#47A248">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
      <path d="M12 11L18 14.5L12 18L6 14.5L12 11Z"/>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" fill="#4479A1">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#4479A1" opacity="0.5"/>
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white"/>
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" fill="#336791">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
      <path d="M12 11L18 14.5L12 18L6 14.5L12 11Z"/>
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" fill="#00758F">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#00758F"/>
      <path d="M12 6L12 18" stroke="white" strokeWidth="2"/>
      <path d="M6 12L18 12" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  redis: (
    <svg viewBox="0 0 24 24" fill="#DC382D">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" fill="#FFCA28">
      <path d="M12 2L2 22H22L12 2Z"/>
      <path d="M12 2L2 22H22L12 2Z" fill="#FFA000" opacity="0.3"/>
      <path d="M12 6L6 22H18L12 6Z" fill="#FFCA28"/>
    </svg>
  ),
  graphql: (
    <svg viewBox="0 0 24 24" fill="#E10098">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 2L2 12L12 22V2Z" fill="#E10098" opacity="0.5"/>
    </svg>
  ),
  prisma: (
    <svg viewBox="0 0 24 24" fill="#2D3748">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 6L6 12L12 18L18 12L12 6Z"/>
    </svg>
  ),

  // Tools & DevOps
  git: (
    <svg viewBox="0 0 24 24" fill="#F05032">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 2L2 12L12 22V2Z" fill="#F05032" opacity="0.5"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="#181717">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" fill="#2496ED">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
      <path d="M12 11L18 14.5L12 18L6 14.5L12 11Z"/>
    </svg>
  ),
  kubernetes: (
    <svg viewBox="0 0 24 24" fill="#326CE5">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
      <path d="M12 11L18 14.5L12 18L6 14.5L12 11Z"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" fill="#FF9900">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
    </svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" fill="#0078D4">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 6L6 12L12 18L18 12L12 6Z"/>
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" fill="#FCC624">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#FCC624" opacity="0.5"/>
      <path d="M12 6L12 18" stroke="white" strokeWidth="2"/>
      <path d="M6 12L18 12" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  nginx: (
    <svg viewBox="0 0 24 24" fill="#009639">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 6L6 12L12 18L18 12L12 6Z"/>
    </svg>
  ),
  webpack: (
    <svg viewBox="0 0 24 24" fill="#8DD6F9">
      <path d="M12 2L2 7L12 22L22 7L12 2Z"/>
      <path d="M12 4L18 7.5L12 11L6 7.5L12 4Z"/>
      <path d="M12 11L18 14.5L12 18L6 14.5L12 11Z"/>
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 24 24" fill="#646CFF">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 6L6 12L12 18L18 12L12 6Z"/>
    </svg>
  ),
  npm: (
    <svg viewBox="0 0 24 24" fill="#CB3837">
      <path d="M4 4H20V20H4V4ZM6 6V18H18V6H6Z" fill="white"/>
      <path d="M12 8H15V16H12V8Z" fill="white"/>
    </svg>
  ),

  // AI/ML
  tensorflow: (
    <svg viewBox="0 0 24 24" fill="#FF6F00">
      <path d="M12 2L2 12L12 22L22 12L12 2Z"/>
      <path d="M12 6L6 12L12 18L18 12L12 6Z"/>
    </svg>
  ),
  pytorch: (
    <svg viewBox="0 0 24 24" fill="#EE4C2C">
      <circle cx="12" cy="12" r="10" fill="#EE4C2C"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
    </svg>
  ),

  // Default
  default: (
    <svg viewBox="0 0 24 24" fill="#6c63ff">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 6L12 18" stroke="white" strokeWidth="2"/>
      <path d="M6 12L18 12" stroke="white" strokeWidth="2"/>
    </svg>
  )
};

// Helper function to get icon by skill name
const getSkillIcon = (skillName) => {
  if (!skillName) return SkillIcons.default;
  
  const lowerName = skillName.toLowerCase().trim();
  
  // Direct mapping
  const iconMap = {
    'react': 'react',
    'react.js': 'react',
    'vue': 'vue',
    'vue.js': 'vue',
    'angular': 'angular',
    'html': 'html',
    'html5': 'html',
    'css': 'css',
    'css3': 'css',
    'tailwind': 'tailwind',
    'tailwind css': 'tailwind',
    'bootstrap': 'bootstrap',
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
    'next': 'next',
    'next.js': 'next',
    'node': 'node',
    'node.js': 'node',
    'express': 'express',
    'express.js': 'express',
    'django': 'django',
    'flask': 'flask',
    'spring': 'spring',
    'spring boot': 'spring',
    'php': 'php',
    'ruby': 'ruby',
    'python': 'python',
    'java': 'java',
    'c++': 'c++',
    'go': 'go',
    'rust': 'rust',
    'swift': 'swift',
    'kotlin': 'kotlin',
    'mongodb': 'mongodb',
    'mongo': 'mongodb',
    'mysql': 'mysql',
    'postgresql': 'postgresql',
    'postgres': 'postgresql',
    'sql': 'sql',
    'redis': 'redis',
    'firebase': 'firebase',
    'graphql': 'graphql',
    'prisma': 'prisma',
    'git': 'git',
    'github': 'github',
    'docker': 'docker',
    'kubernetes': 'kubernetes',
    'k8s': 'kubernetes',
    'aws': 'aws',
    'azure': 'azure',
    'linux': 'linux',
    'nginx': 'nginx',
    'webpack': 'webpack',
    'vite': 'vite',
    'npm': 'npm',
    'tensorflow': 'tensorflow',
    'pytorch': 'pytorch',
  };

  const iconKey = iconMap[lowerName] || 
                  Object.keys(iconMap).find(key => lowerName.includes(key)) || 
                  'default';
  
  return SkillIcons[iconKey] || SkillIcons.default;
};

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    percentage: 0,
    icon: '',
    category: 'other',
    order: 0,
  });

  const categories = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'tools', label: 'Tools' },
    { value: 'ai_ml', label: 'AI/ML' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/skills', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
    } catch (error) {
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editingSkill) {
        await axios.put(`/api/skills/${editingSkill._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Skill updated successfully');
      } else {
        await axios.post('/api/skills', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Skill added successfully');
      }
      fetchSkills();
      closeModal();
    } catch (error) {
      toast.error('Failed to save skill');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/skills/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Skill deleted');
        fetchSkills();
      } catch (error) {
        toast.error('Failed to delete skill');
      }
    }
  };

  const openModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData(skill);
    } else {
      setEditingSkill(null);
      setFormData({ name: '', percentage: 0, icon: '', category: 'other', order: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const getCategoryLabel = (value) => {
    const cat = categories.find(c => c.value === value);
    return cat ? cat.label : value;
  };

  const getCategoryColor = (category) => {
    const colors = {
      frontend: '#6c63ff',
      backend: '#00d4ff',
      database: '#10b981',
      tools: '#f59e0b',
      ai_ml: '#8b5cf6',
      other: '#6b7280',
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Manage Skills</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Add, edit, or remove your technical skills</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          + Add New Skill
        </button>
      </div>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>No skills added yet</p>
          <button onClick={() => openModal()} className="btn-primary">Add Your First Skill</button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {skills.map((skill, index) => {
            const IconComponent = getSkillIcon(skill.name);
            return (
              <motion.div
                key={skill._id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card"
                style={{ padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '10px',
                      background: 'rgba(108, 99, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px'
                    }}>
                      {IconComponent}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{skill.name}</h3>
                      <span style={{
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '2rem',
                        background: `${getCategoryColor(skill.category)}20`,
                        color: getCategoryColor(skill.category)
                      }}>
                        {getCategoryLabel(skill.category)}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {skill.percentage}%
                  </span>
                </div>
                
                <div className="progress-container" style={{ marginBottom: '1rem' }}>
                  <div className="progress-fill" style={{ width: `${skill.percentage}%` }} />
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => openModal(skill)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'rgba(108, 99, 255, 0.2)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'var(--error)',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              overflowY: 'auto'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass-card"
              style={{ maxWidth: '500px', width: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                  {editingSkill ? 'Update the skill details below' : 'Enter the skill details below'}
                </p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label>Skill Name</label>
                    <input
                      type="text"
                      placeholder="e.g., React, Node.js, Python"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    {formData.name && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        background: 'rgba(108, 99, 255, 0.05)',
                        borderRadius: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>🔍 Auto-detected icon:</span>
                        <div style={{ width: '24px', height: '24px' }}>
                          {getSkillIcon(formData.name)}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {formData.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label>Icon (Custom)</label>
                    <input
                      type="text"
                      placeholder="Custom icon or leave empty for auto"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Leave empty to use auto-detected icon
                    </p>
                  </div>
                  
                  <div>
                    <label>Percentage ({formData.percentage}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
                      style={{ padding: '0', height: '6px', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label>Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Lower numbers appear first
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                      {editingSkill ? 'Update Skill' : 'Add Skill'}
                    </button>
                    <button type="button" onClick={closeModal} className="btn-secondary" style={{ flex: 1 }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageSkills;