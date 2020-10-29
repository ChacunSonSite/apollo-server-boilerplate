import consola from 'consola';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import { SignToken } from '../../jwt';

export const UserResolvers = {
  Query: {
    users: async (_, args = '', { User, currentUser }) => {
      try {
        if (
          currentUser && (
            currentUser.role.name === 'SUPER-ADMIN' ||
            currentUser.role.name === 'ADMIN'
          )
        ) {
          return await User.find({}).populate({
            path: 'role',
            model: 'Role',
          });
        }
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
    me: (_, args, { currentUser }) => {
      return currentUser;
    }
  },
  Mutation: {
    async signIn (_, { email, password }, { User, res, currentUser, sessions }) {
      if (!currentUser) {
        const user = await User.findOne({ email }).populate({
          path: 'role',
          model: 'Role',
        });;
        if (user && await bcrypt.compare(password, user.password)) {

          const sessionId = await sessions.set({
            email: user.email, role: { name: user.role.name }
          });
          consola.log((parseInt(Date.now() / 1000) + 3 * (60 * 60)));
          const newToken = await SignToken(
            { session: sessionId },
            (parseInt(Date.now() / 1000) + 3 * (60 * 60))
          );
          consola.info(`TOKEN!!!: ${newToken}`);
          res.header('Authorization', `Bearer ${newToken}`);
          return `welcome back`;
        } else {
          throw new Error('User not exist');
        }
      } else {
        return 'User already connected';
      }
    },
    async signOut (_, args, { sessions, sessionId, }) {
      try {
        return sessions.del(sessionId)
      }
      catch (err) {
        consola.error(`SignOut: ${err}`);
      }
    },
    async signUp (_, { email, password, role }, { User, Role, currentUser }) {
      // Verify if user already exist
      if (await User.findOne({ email })) {
        throw new Error('User already exist');
      }

      // validate rights of current user
      if (currentUser) {
        switch (role.name) {
          case 'ADMIN':
            if (role === 'SUPER-ADMIN') {
              throw new Error("You can't create an user with this role ");
            }
            break;
          case 'USER':
            throw new Error("You can't create an extra user");
        }
      } else {
        role = 'USER'
      }

      var roleDB = await Role.findOne({ name: role });
      if (await User.estimatedDocumentCount({}) < 1) {
        roleDB = await Role.findOne({ name: 'SUPER-ADMIN' });
      }
      const hash = await bcrypt.hashSync(password, salt);
      if (
        roleDB &&
        (await new User({
          email,
          password: hash,
          role: roleDB._id,
        }).save())
      ) {
        return `user created!`;
      } else {
        throw new Error("something wrong we can't save the new user");
      }
    },
  },
};
