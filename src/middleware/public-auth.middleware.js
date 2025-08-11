export const publicAuthMiddleware  = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (process.env.API_KEY && apiKey === process.env.API_KEY) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
}
