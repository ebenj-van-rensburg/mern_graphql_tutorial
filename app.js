import express from 'express';
import pkg from 'body-parser';
const { json } = pkg;
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

import graphQlSchema from './graphql/schema/index.js';
import graphQlResolvers from './graphql/resolvers/index.js';
import isAuth from './middleware/is-auth.js';

const app = express();

app.use(json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.diye5nm.mongodb.net/${process.env.MONGO_DB}`
    );
    app.listen(8000, () => {
      console.log('Server is running on port 8000');
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();