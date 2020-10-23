require('dotenv').config();
import { ApolloServer, gql } from 'apollo-server';

console.log(`Starting on ${process.env.NODE_ENV} mode`);

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      _empty: String
    }
    type Mutation {
      _empty: String
    }
  `,
});

server.listen(process.env.PORT, process.env.HOST).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
