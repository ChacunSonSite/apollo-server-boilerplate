'use strict';
import mongoose from 'mongoose';

export default mongoose.model(
  'Role',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  })
);
