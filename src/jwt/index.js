import jwt from "jsonwebtoken";
import util from 'util';
import consola from 'consola';
import { Key } from '../db/models/Key';

const getKey = async (header, callback) => {
  consola.info(`token Header: ${util.inspect(header, { showHidden: true, depth: null })}`);
  callback(null, (await Key.findOne({ _id: header.kid })).key);
}

const verifyPromise = (...args) => {
  return new Promise((resolve, reject) => {
    jwt.verify(...args, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export const ValidateToken = (token) => {
  try {
    return verifyPromise(token, getKey);
  } catch (err) {
    consola.error(`Sign error: ${err}`);
  }
}

export const SignToken = async (data, expire = '2h') => {
  try {
    const privateKey = (await Key.aggregate([{ $sample: { size: 1 } }]))[0];
    const token = jwt.sign(
      data,
      privateKey.key,
      { expiresIn: expire, header: { kid: privateKey._id } },
    );
    return token
  } catch (err) {
    consola.error(`Sign error: ${err}`);
  }
}
