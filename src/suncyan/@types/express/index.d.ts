import { redis } from '../modules/redis';

declare global {
  namespace Express {
    export interface Request extends redis {
      Redis?: redis
    }
  }
}
