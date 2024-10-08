import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../prisma';
import jwt from 'jsonwebtoken';

const USER_KEY = 'user';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!foundUser) return res.status(401).json({ message: 'There are not account connected to that email' });

  const isCorrectPassword = await bcrypt.compare(password, foundUser.password);

  if (!isCorrectPassword) return res.status(401).json({ message: 'Incorrect password' });

  const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.cookie(USER_KEY, token, { httpOnly: true });

  return res.json(foundUser);
};

export const signup = async (req: Request, res: Response) => {
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
      xp: 0
    },
  });

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.cookie(USER_KEY, token, { httpOnly: true });

  return res.status(201).json(newUser);
};

export const getCurrentUser = async (req: Request, res: Response) => {
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

export const updateUser = async (req: Request, res: Response) => {
  const token = req.cookies[USER_KEY];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const currentUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      }
    });

    if (!currentUser) return res.status(404).json({ message: 'Not authenticated' });

    const { username, email, password, xp } = req.body;

    let updates: any = {};
    if (username && username.trim() !== '') updates.username = username;
    if (email && email.trim() !== '') updates.email = email;
    if (password && password.trim() !== '') updates.password = password;
    if (xp) updates.xp = xp + currentUser.xp;

    const updatedUser = await prisma.user.update({
      where: {
        id: decoded.id
      },
      data: updates
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie(USER_KEY);
  return res.status(200).json({ message: 'Logged out' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const token = req.cookies[USER_KEY];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const deletedUser = await prisma.user.delete({
      where: {
        id: decoded.id
      }
    });

    if (!deleteUser) return res.status(500).json({ message: 'Somethings went wrong during the process. Try again later.' });

    return res.status(202).json(deletedUser);
  } catch (error) {
    console.error('Error creating result:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTopResults = async (req: Request, res: Response) => {
  try {
    const highestWpmPerUser = await prisma.result.groupBy({
      by: ['userId'],
      _max: {
        wpm: true,
      },
    });

    const results = await prisma.result.findMany({
      where: {
        OR: highestWpmPerUser.map(item => ({
          userId: item.userId,
          wpm: item._max.wpm,
        })),
      },
      include: {
        user: true,
      },
      orderBy: {
        wpm: 'desc',
      },
    });

    return res.status(201).json(results);
  } catch (error) {
    console.error('Error creating result:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const saveResult = async (req: Request, res: Response) => {
  const token = req.cookies[USER_KEY];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const { userId, wpm, acc, entries, time, errors, mode } = req.body;
    
    if (!userId || !wpm || !acc || !entries || !time || errors === undefined || !mode) {
      return res.status(400).json({ message: 'Arguments are not valid' });
    }

    const result = await prisma.result.create({
      data: {
        userId,
        wpm,
        acc,
        entries,
        time,
        errors,
        mode
      },
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating result:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserResults = async (req: Request, res: Response) => {
  const token = req.cookies[USER_KEY];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const currentUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        results: {
          orderBy: {
            createdAt: 'desc'
          }
        },
      },
    });

    if (!currentUser) return res.status(404).json({ message: 'Not authenticated' });

    return res.status(201).json(currentUser.results);
  } catch (error) {
    console.error('Error creating result:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
