import { Result, User } from "@prisma/client";
import { ExtendedResult } from "models";
import TypingResultDto from "models/TypingResultDto";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });
  return response.json();
};

export const signup = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
    credentials: 'include'
  });
  return response.json();
};

export const getCurrentUser = async (): Promise<User | null>  => {
  try {
    const response = await fetch(`${API_URL}/current-user`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('User not authenticated.');
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
      return null;
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const updateUser = async (updates: any): Promise<User | { message: string }> => {
  const response = await fetch(`${API_URL}/user-update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  const updatedUser = await response.json();
  return updatedUser;
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  return response.json();
};

export const deleteUser = async () => {
  const response = await fetch(`${API_URL}/user-delete`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (response.ok) {
    logout();
  };

  return await response.json();
};

export const getTopResults = async () => {
  try {
    const response = await fetch(`${API_URL}/top-results`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json() as ExtendedResult[];
  } catch (error) {
    console.error('Error fetching top results:', error);
  }
};

export const saveResult = async (result: TypingResultDto): Promise<Result | { message: string }> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return { message: 'You need to be authenticated to save the result' };
    };

    const response = await fetch(`${API_URL}/save-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userId: currentUser.id, ...result }),
    });

    if (!response.ok) {
      throw new Error('Failed to add result');
    }

    const resultData = await response.json();
    return resultData;
  } catch (error) {
    console.error('Error adding result:', error);
    throw error;
  }
};

export const getUserResults = async (): Promise<Result[] | { message: string }> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return { message: 'You need to be authenticated to save the result' };
    };

    const response = await fetch(`${API_URL}/user-results`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to add result');
    }

    const resultData = await response.json();
    return resultData;
  } catch (error) {
    console.error('Error adding result:', error);
    throw error;
  }
};
