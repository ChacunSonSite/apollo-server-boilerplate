import { merge } from 'lodash'
import { gql } from 'apollo-server';
import { UserResolvers } from './user';
import { EmailAddressResolver } from 'graphql-scalars';
import UserType from './user/type.gql';

const Types = gql`
  scalar EmailAddress
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
export const typeDefs = [Types, gql`${UserType}`];
export const resolvers = merge({ EmailAddress: EmailAddressResolver }, UserResolvers);
