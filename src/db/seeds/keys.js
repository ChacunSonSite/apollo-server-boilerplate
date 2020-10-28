/*
  This seed will create 20 private PEM key and store it on the database.
  the keys will used randomly for sign the JWTs.
*/
import { generateKeyPairSync } from 'crypto';
import { Key } from '../models/Key';

(async () => {
  if (await Key.estimatedDocumentCount() < 20) {
    consola.success("inside key seeds");
    const Keys = []
    for (let i = 0; i < 20; i++) {
      const { privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,  // the length of your key in bits
        privateKeyEncoding: {
          type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
          format: 'pem',
        }
      });
      Keys.push({ key: privateKey });
    }
    Key.insertMany(Keys);
  }
})()

