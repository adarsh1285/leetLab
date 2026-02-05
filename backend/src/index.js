import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to my leetLab backend! 🔥');
});


app.use('/api/v1/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
