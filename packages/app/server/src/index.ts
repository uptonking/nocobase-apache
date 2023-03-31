import { Application } from '@nocobase/server';
import config from './config';

const app = new Application({ ...config, cors: true, acl: false, logger: { level: 'debug' } });

if (require.main === module) {
  app.runAsCLI();
}

export default app;
