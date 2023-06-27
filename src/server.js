import express from 'express';
import cors from 'cors';
import { router as authRouter } from './routes/auth.js';
import { router as usersRouter } from './routes/users.js';
import { router as tenderRouter } from './routes/tenders.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { startTenderUpdater } from './services/tender.js';
import { auth } from './middlewares/auth.js';
dotenv.config();

const { DB_HOST, PORT = 8080 } = process.env;
const app = express();

app.use(cors());
app.use('/login', express.json(), authRouter);
app.use('/users', auth, express.json(), usersRouter);
app.use('/tenders', auth, express.json(), tenderRouter);

mongoose
  .connect(DB_HOST)
  .then(() => console.log('db conected successfully'))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    }))
  .then(startTenderUpdater)
  .catch((error) => console.log(error.message));
