import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/book.js';
import route from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/books', route);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to your first MERN stack app');
});

mongoose
  .connect(mongoDBURL)
    .then(() => {
      console.log(`Connection successful`);
      app.listen(PORT, () => {
        console.log(`Server listenning on PORT: ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(`Error connecting to db
        message: ${error}
      `);
    });