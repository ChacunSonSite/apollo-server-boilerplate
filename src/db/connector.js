'use strict';
import mongoose from 'mongoose';
require('dotenv').config();

export default mongoose.connect(
  ['mongodb://', process.env.DB_SERVER, process.env.DB_DBNAME].join(''),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useUnifiedTopology: true,
  }
);
