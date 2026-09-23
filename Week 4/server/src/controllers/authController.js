import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function tokenFor(user) { return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }); }
function responseFor(user) { return { token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } }; }

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
  if (await User.findOne({ email })) return res.status(409).json({ message: 'Email is already registered' });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.status(201).json(responseFor(user));
}

export async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password' });
  res.json(responseFor(user));
}

export function profile(req, res) { res.json({ user: req.user }); }

export async function getUserCount(req, res) {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}