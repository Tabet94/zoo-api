const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
    console.log('Received token:', token);  // Log the token to check format
    
    if (!token) return res.status(401).send('Access Denied');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);
      req.user = decoded;

      // If roles array is not empty, check if user has the required role
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).send('Unauthorized');
      }
      next();
    } catch (err) {
      res.status(401).send('Invalid Token');
    }
  };
};

module.exports = authMiddleware;
