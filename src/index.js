require('dotenv').config();
import consola from 'consola';
import util from 'util';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import dbConnector from './db/connector';
import { typeDefs, resolvers } from './schema';
import { User, Role } from './db/models';

consola.info({
  message: `Starting on ${process.env.NODE_ENV} mode`,
  badge: true,
});

const context = async ({ req }) => {
  //consola.info(`Calling context ${util.inspect(req.headers, { showHidden: true, depth: null })}`);
  let user = false;
  // get the user token from the headers
  const token = req.headers.authentication || false;

  if (token) {
    // try to retrieve a user with the token
    user = await User.findOne({ token: token });

    consola.info(`token= ${token}, User: ${util.inspect(user, { showHidden: true, depth: null })}`);
  }

  // optionally block the user
  // we could also check user roles/permissions here
  if (!user) throw new AuthenticationError('you must be logged in to query this schema');

  return {
    User,
    Role
  }
}

var server = {};
if (process.env.NODE_ENV === 'production') {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: false,
    playground: false,
  });
} else {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });
}

dbConnector
  .then(async () => {
    const roles = await Role.countDocuments({});
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
