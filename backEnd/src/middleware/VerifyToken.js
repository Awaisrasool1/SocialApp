const JWT_SECRET = require("../../utils/Constant");
const jwt = require('jsonwebtoken');

const isAuthentication = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: 'Invalid token'});
  }
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({error: 'Invalid token'});
  }
};

module.exports = isAuthentication;
