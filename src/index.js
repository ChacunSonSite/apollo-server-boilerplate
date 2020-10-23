const { ApolloServer, gql } = require('apollo-server');

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      _empty: String
    }
    type Mutation {
      _empty: String
    }
  `
});

server.listen().then(({ url }) => {
  console.log(`apollo-server started on ${url}`);
});
