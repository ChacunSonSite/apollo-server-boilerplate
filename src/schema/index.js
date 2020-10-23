import { gql } from 'apollo-server';
import { UserResolvers } from './user';
import UserType from './user/type.gql';

const Types = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
export const typeDefs = [Types, gql`${UserType}`];
export const resolvers = UserResolvers;
