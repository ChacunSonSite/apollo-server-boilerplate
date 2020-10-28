import consola from "consola";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import { SignToken } from '../../jwt'

export const UserResolvers = {
  Query: {
    users: (_, args = '', { User }) => {
      try {
        return User.find({}).populate({
          path: 'role',
          model: 'Role',
        });
      } catch (err) {
        consola.error(err);
      }
    },
    user: (_, { id }, { User }) => {
      return User.findById(id).populate({
        path: 'role',
        model: 'Role',
      });
    },
  },
  Mutation: {
    async signIn (_, { email, password }, { User, res, currentUser }) {
      if (!currentUser) {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
          const newToken = await SignToken(
            { username: user.username, email: user.email }
          );
          consola.info(`TOKEN!!!: ${newToken}`);
          res.header('authorization', newToken);
          return `user ${user.username} has a new token! test`;
        } else {
          throw new Error('User not exist');
        }
      } else {
        return 'User already connected';
      }
    },
    async signupUser (_, { username, email, password, role = 'USER' }, { User, Role }) {
      // TODO: securize account creation, now any one can be super-admin or Admin. Apply connection verification,
      // Only SUPER-ADMIN should be capable to create other SUPER-ADMIN,
      // SUPER-ADMIN and ADMIN can create other ADMIN or USER
      // when USER is connect don't read role parameter.

      if (await User.findOne({ username })) {
        throw new Error('User already exist');
      }
      var roleDB = await Role.findOne({ name: role });
      if (await User.estimatedDocumentCount({}) < 1) {
        roleDB = await Role.findOne({ name: 'SUPER-ADMIN' });
      }
      const hash = await bcrypt.hashSync(password, salt);
      if (
        roleDB &&
        (await new User({
          username,
          email,
          password: hash,
          role: roleDB._id,
        }).save())
      ) {
        return `user ${username} created!`;
      } else {
        throw new Error("something wrong we can't save the new user");
      }
    },
  },
};
