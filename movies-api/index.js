import dotenv from 'dotenv';
import express from 'express';
import './db';
// other imports
import cors from 'cors';
//... other imports
import usersRouter from './api/users';
import authenticate from './authenticate';
import moviesRouter from './api/movies';   
import actorsRouter from './api/actors/';


dotenv.config();
const errHandler = (err, req, res, next ) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();
app.use(cors());

const port = process.env.PORT;

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).send('Movies API working');
});
app.use('/api/movies', authenticate, moviesRouter); 

//Users router
app.use('/api/users', usersRouter);

app.use('/api/actors', actorsRouter);
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
