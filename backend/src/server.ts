import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { login, signup, getCurrentUser, logout, saveResult, getUserResults } from './controllers/authController';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.post('/login', login);
app.post('/signup', signup);
app.get('/current-user', getCurrentUser);
app.post('/logout', logout);
app.post('/save-result', saveResult);
app.get('/user-results', getUserResults);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
