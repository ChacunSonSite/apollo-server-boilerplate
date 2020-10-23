'use strict';
import mongoose from 'mongoose';

export default mongoose.model(
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
      roles: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Role',
      },
    },
    { timestamps: true }
  )
);
