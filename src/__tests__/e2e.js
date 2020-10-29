const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, schema } = require('../server');

const server = new ApolloServer({ ...schema });
const GET_USERS = gql`query {
  users {
    email
    role {
      name
    }
  }
}`
describe('Test Server, no context', () => {
  it('Users whit out credentials', async () => {
    const { query } = createTestClient(server);
    const res = await query({ query: GET_USERS });
    expect(res).toMatchSnapshot();
  });
});
