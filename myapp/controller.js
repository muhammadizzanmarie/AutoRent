const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./models.js");

const register = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nama,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        res.status(201).json({ message: "User berhasil terdaftar", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });

        res.json({ message: "Login berhasil", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { register, login };
