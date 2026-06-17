import React from 'react';
import { motion } from 'framer-motion';

const CertificateCard = ({ certificate, index }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="glass-card overflow-hidden cursor-pointer group"
      onClick={() => certificate.credentialUrl && window.open(certificate.credentialUrl, '_blank')}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{certificate.title}</h3>
        <p className="text-blue-400 text-sm mb-2">{certificate.issuedBy}</p>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-xs">
            {new Date(certificate.issueDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </p>
          {certificate.credentialUrl && (
            <span className="text-xs text-purple-400">View →</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;