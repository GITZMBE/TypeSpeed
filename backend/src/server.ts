import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { login, signup, getCurrentUser, logout } from './controllers/authController';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/login', login);
app.post('/signup', signup);
app.get('/current-user', getCurrentUser);
app.post('/logout', logout);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
