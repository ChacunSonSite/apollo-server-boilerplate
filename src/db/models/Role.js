'use strict';
import mongoose from 'mongoose';

export const Role = mongoose.model(
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
