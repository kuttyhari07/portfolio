const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  console.log('🔑 Generating token for ID:', id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

module.exports = generateToken;