import { server } from './server';
import dbConnector from './db/connector';
import { Role } from './db/models';

dbConnector
  .then(async () => {
    if (await Role.countDocuments({}) < 1) {
      consola.error('No roles on DB');
      require('./db/seeds/keys');
      require('./db/seeds/roles');
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
