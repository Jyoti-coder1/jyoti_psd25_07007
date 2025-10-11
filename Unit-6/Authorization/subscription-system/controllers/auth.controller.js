const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { BlacklistedToken } = require('../middleware/blacklist.middleware');

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const accessExp = process.env.ACCESS_EXPIRES || '15m';
const refreshExp = process.env.REFRESH_EXPIRES || '7d';

function signAccess(user) {
    return jwt.sign({ id: user._id, role: user.role }, accessSecret, { expiresIn: accessExp });
}
function signRefresh(user) {
    return jwt.sign({ id: user._id }, refreshSecret, { expiresIn: refreshExp });
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, password required' });

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: 'Email already used' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role: role || 'user' });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const accessToken = signAccess(user);
        const refreshToken = signRefresh(user);
        res.json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

        const black = await BlacklistedToken.findOne({ token: refreshToken });
        if (black) return res.status(401).json({ message: 'Refresh token revoked' });

        let payload;
        try {
            payload = jwt.verify(refreshToken, refreshSecret);
        } catch (e) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const user = await User.findById(payload.id);
        if (!user) return res.status(401).json({ message: 'User not found' });

        const newAccess = signAccess(user);
        res.json({ accessToken: newAccess });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        const { accessToken, refreshToken } = req.body;
        const now = new Date();

        const promises = [];
        if (accessToken) {
            let exp = null;
            try {
                const p = jwt.decode(accessToken);
                if (p && p.exp) exp = new Date(p.exp * 1000);
            } catch { }
            if (exp) promises.push(BlacklistedToken.create({ token: accessToken, expiresAt: exp }));
        }
        if (refreshToken) {
            let exp = null;
            try {
                const p = jwt.decode(refreshToken);
                if (p && p.exp) exp = new Date(p.exp * 1000);
            } catch { }
            if (exp) promises.push(BlacklistedToken.create({ token: refreshToken, expiresAt: exp }));
        }
        await Promise.all(promises);
        res.json({ message: 'Logged out' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};