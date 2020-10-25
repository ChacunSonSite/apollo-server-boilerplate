'use strict';
import mongoose from 'mongoose';

export const Key = mongoose.model(
  'Key',
  new mongoose.Schema({
    key: {
      type: String,
      required: true,
    },
  })
);
