module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: "mongodb://localhost:27017/social_network",
    SESSION_SECRET: process.env.SESSION_SECRET,
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    PER_PAGE: process.env.PER_PAGE
};