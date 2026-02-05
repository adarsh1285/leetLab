import express from 'express';
import { register, login, logout, getProfile } from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.post('/logout', logout);

authRoutes.get('/profile', getProfile);

export default authRoutes;