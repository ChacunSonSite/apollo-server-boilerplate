import consola from "consola";

export const UserResolvers = {
  Query: {
    users: (_, args = '', { User }) => {
      return User.find({}).populate({
        path: 'role',
        model: 'Role',
      });
    },
    user: (_, { id }, { User }) => {
      return User.findById(id).populate({
        path: 'role',
        model: 'Role',
      });
    },
  },
  Mutation: {
    async signIn (_, { email, password }, { User }) {
      const user = await User.findOne({ email, password });
      if (user) {
        return `user ${user.username} JWT new token! test`;
      } else {
        throw new Error('User not exist');
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

      if (
        roleDB &&
        (await new User({
          username,
          email,
          password,
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
