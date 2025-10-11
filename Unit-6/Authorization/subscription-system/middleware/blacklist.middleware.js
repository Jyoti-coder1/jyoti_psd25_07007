const BlacklistedToken = require('../models/BlacklistedToken');

async function isBlacklisted(token) {
    if (!token) return false;
    const found = await BlacklistedToken.findOne({ token });
    return !!found;
}

module.exports = { isBlacklisted, BlacklistedToken: require('../models/BlacklistedToken') };