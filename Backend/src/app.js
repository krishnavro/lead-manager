const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const leadRouter = require('./routes/leadRouter');
const app = express();
app.use(cors({
    origin: ['http://localhost:5173',
        'https://lead-manager-green-ten.vercel.app'
    ],
    
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use('/api',leadRouter);

module.exports = app;