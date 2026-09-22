// Custom logger middleware to log HTTP method, request URL, and ISO timestamp
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${req.method} ${req.originalUrl || req.url} - ${timestamp}`);
  next();
};

module.exports = logger;
