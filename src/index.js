require('dotenv').config();
import consola from 'consola';
import { ValidateToken } from './jwt';
import { ApolloServer } from 'apollo-server';
import dbConnector from './db/connector';
import * as schema from './schema';
import * as models from './db/models';
import { Sessions } from './session';

consola.info({
  message: `Starting on ${process.env.NODE_ENV} mode`,
  badge: true,
});

const context = async ({ req, res }) => {
  var currentUser = false;
  const sessions = new Sessions({
    password: process.env.REDIS_PASS,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  })
  if (req.headers && req.headers.authorization) {
    try {
      var sessionId = (await ValidateToken(req.headers.authorization)).session;
      currentUser = await sessions.get(sessionId);
      await sessions.refresh(sessionId, currentUser);
    } catch (err) {
      consola.error(`ERROR: ${err} `);
    }
  }
  return {
    sessions,
    sessionId,
    currentUser,
    res,
    ...models,
  };
}

const options = {
  ...schema,
  context,
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(options, {
    introspection: false,
    playground: false,
  });
}

const server = new ApolloServer(options);

dbConnector
  .then(async () => {
    if (await models.Role.countDocuments({}) < 1) {
      consola.error('No roles on DB');
      require('./db/seeds/keys');
      require('./db/seeds/roles');
    }
    server.listen(process.env.PORT, process.env.HOST).then(({ url }) => {
      consola.ready({
        message: `🚀 Server ready at ${url}`,
        badge: true,
      });
    });
  })
  .catch((err) => {
    consola.error({
      message: err,
      badge: true,
    });
  });

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
