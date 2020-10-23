import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server';

dotenv.config();

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

server.listen(process.env.PORT, process.env.HOST).then(({ url }) => {
  console.log(`apollo-server started on ${url}`);
});
