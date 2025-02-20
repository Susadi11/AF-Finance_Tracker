const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
const PORT = process.env.PORT || 5555;
const MONGOURI = process.env.MONGOURI;

mongoose.connect(MONGOURI)
    .then(() => {console.log('Connected to MongoDB...')})
    .catch((err) => {console.error('Error connecting to MongoDB...', err)})

app.use(express.json());

app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes);
app.use('/budget', budgetRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});