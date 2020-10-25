require('dotenv').config();
import consola from 'consola';
import jwt from "jsonwebtoken";
import { ApolloServer } from 'apollo-server';
import dbConnector from './db/connector';
import * as schema from './schema';
import * as models from './db/models';

consola.info({
  message: `Starting on ${process.env.NODE_ENV} mode`,
  badge: true,
});

const context = async ({ req, res }) => {
  var currentUser = false;
  if (req.headers.authentication) {
    try {
      const decoded = jwt.verify(req.headers.authentication, process.env.PRIVATE_KEY);
      currentUser = await models.User.findOne({ email: decoded.email, username: decoded.username });
    } catch (err) {
      consola.error(`ERROR: ${err} `);
    }
  }
  return {
    currentUser,
    res,
    ...models
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
    const roles = await models.Role.countDocuments({});
    if (roles < 1) {
      consola.error('No roles on DB');
      require('./db/seeds/role');
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
