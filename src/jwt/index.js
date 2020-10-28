import jwt from "jsonwebtoken";
import consola from 'consola';
import { Key } from '../db/models/Key';

const getKey = async (header, callback) => {
  // Use Key Id to retrace the key used to sign the token.
  callback(null, (await Key.findOne({ _id: header.kid })).key);
}

// jwt
const verifyPromise = (...args) => {
  return new Promise((resolve, reject) => {
    jwt.verify(...args, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export const ValidateToken = (authorization) => {
  try {
    const token = authorization.split(' ')[1];
    return verifyPromise(token, getKey, { ignoreExpiration: true });
  } catch (err) {
    consola.error(`Sign error: ${err}`);
  }
}

export const SignToken = async (data) => {
  try {
    // Chose randomly a key from the keys collection
    const privateKey = (await Key.aggregate([{ $sample: { size: 1 } }]))[0];
    const token = jwt.sign(
      data,
      privateKey.key,
      {
        header: {
          kid: privateKey._id // Add key id to the JWT header, it will use during verification
        }
      },
    );
    return token
  } catch (err) {
    consola.error(`Sign error: ${err}`);
  }
}
