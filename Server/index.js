import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log('Connected to DB'))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.listen(8000, () => {
    console.log("Server running at PORT 8000");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});