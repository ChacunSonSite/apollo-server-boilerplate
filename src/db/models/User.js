'use strict';
import mongoose from 'mongoose';

export const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      joinDate: {
        type: Date,
        default: Date.now,
      },
      role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Role',
      },
      token: {
        type: String,
        required: false,
        trim: true,
      },
    },
    { timestamps: true }
  )
);
