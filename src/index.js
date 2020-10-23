require('dotenv').config();
import consola from 'consola';
import { ApolloServer, gql } from 'apollo-server';
import dbConnector from './db/connector';
import { typeDefs, resolvers } from './schema';
import context from './db/models/context';

consola.info({
  message: `Starting on ${process.env.NODE_ENV} mode`,
  badge: true,
});

var server = {};
// create server constant including:
// type definitions (graphql),
// resolvers (js functions)
// and context(mongo models)
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
    const roles = await context.Role.countDocuments({});
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
