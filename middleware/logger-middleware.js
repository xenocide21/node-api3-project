function loggerMiddleware(req, res, next) {
    // request method, request url, timestamp
    console.log(`${req.method} ${req.baseUrl} ${new Date().toISOString()}`);
    next();
}

module.exports = loggerMiddleware;