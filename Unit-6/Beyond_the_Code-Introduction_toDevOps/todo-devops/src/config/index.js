require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/todos',
    jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
    nodeEnv: process.env.NODE_ENV || 'development',
    renderDeployHook: process.env.RENDER_DEPLOY_HOOK_URL || ''
};