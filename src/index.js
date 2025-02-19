// Load environment variables at the very top
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Retrieve environment variables
const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.MONGODB_URL;

// (Optional) Debug: Check if the environment variables are loaded
console.log("PORT:", PORT);
console.log("MongoDB URL:", mongoDBURL);

app.use(express.json());

app.use(
    cors({
        origin: ['http://localhost:3000', ''],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome to Elemahana');
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
