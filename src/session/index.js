import consola from 'consola';
import Redis from 'ioredis';
import uid from 'uid-safe';

export class Sessions {
  constructor({ password, host, port }) {
    this.redis = new Redis({
      host,
      port,
      password,
      db: 0,
    });
  }

  async set (val) {
    try {
      const key = await uid(18);
      while (await this.redis.get(key)) {
        key = await uid(18);
      }
      this.redis.set(key, JSON.stringify(val), "EX", 1800);
      return key;
    } catch (err) {
      consola.error(`Redis error: ${err}`);
    }
  }

  async get (key) {
    const session = await this.redis.get(key);
    return JSON.parse(session);
  }

  async refresh (key, val) {
    await this.redis.set(key, JSON.stringify(val), "EX", 1800);
  }

  async del (key) {
    return (await this.redis.del(key)) ? 'Bye bye!' : false;
  }
}
