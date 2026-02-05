import bcrpt from 'bcryptjs';
import { db } from '../libs/db.js';
import { UserRole } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name , email , password } = req.body;

    try{
        const existingUser = await db.user.findUnique({
            where: {
                email
            },
        })
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrpt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword, 
                role: UserRole.USER
            }
        });

        // res.status(201).json({ message: 'User registered successfully', user: newUser });

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(201).json({ message: 'User registered successfully', user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            image: newUser.image
        } });


    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export const login = async (req, res) => {}

export const logout = async (req, res) => {}

export const getProfile = async (req, res) => {}