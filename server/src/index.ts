import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import { connectToDatabase } from './database';

dotenv.config();

const app = express();
const port = process.env.APPLICATION_PORT;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(bodyParser.json());
app.use('/api', routes);

const startServer = () => {
  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
};

const start = async () => {
  await connectToDatabase();
  startServer();
};

start();
