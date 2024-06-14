import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../prisma';
import jwt from 'jsonwebtoken';

const USER_KEY = 'user';

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!foundUser) return res.status(401).json({ message: 'Invalid email or password' });

  const isCorrectPassword = await bcrypt.compare(password, foundUser.password);

  if (!isCorrectPassword) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.cookie(USER_KEY, token, { httpOnly: true });

  return res.json(foundUser);
};

export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;

  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (foundUser) return res.status(409).json({ message: 'Email already in use' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.cookie(USER_KEY, token, { httpOnly: true });

  return res.status(201).json(newUser);
};

export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {
  const token = req.cookies[USER_KEY];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const currentUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        results: true,
      },
    });

    if (!currentUser) return res.status(404).json({ message: 'User not found' });

    return res.json(currentUser);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const logout = (req: Request, res: Response): Response => {
  res.clearCookie(USER_KEY);
  return res.status(200).json({ message: 'Logged out' });
};
