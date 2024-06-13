import { User } from '@prisma/client';
import prisma from '@prisma/index';
import bcrypt from "bcrypt";

const USER_KEY = "user";

export const login = async (email: string, password: string) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!foundUser) return;

  const isCorrectPassword = await bcrypt.compare(password, foundUser.password);

  if (!isCorrectPassword) return;

  localStorage.setItem(USER_KEY, JSON.stringify(foundUser));

  return foundUser;
};

export const signup = async (username: string, email: string, password: string) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (foundUser) return;
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser: User = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  });

  if (!newUser) return;

  localStorage.setItem(USER_KEY, JSON.stringify(newUser));

  return newUser;
};

export const getCurrentUser = async () => {
  const string = localStorage.getItem(USER_KEY);
  if (!string) return null;

  const user: User = JSON.parse(string);

  prisma.user.findUnique({
    where: {
      email: user.email
    },
    include: {
      results: true
    }
  })
  return user;
};
