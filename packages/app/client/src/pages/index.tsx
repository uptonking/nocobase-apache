import { Application } from '@nocobase/client';

// console.log(';; apiClient-baseUrl ', process.env.API_BASE_URL);
export const app = new Application({
  apiClient: {
    baseURL: process.env.API_BASE_URL,
  },
  dynamicImport: (name: string) => {
    return import(`../plugins/${name}`);
  },
});

export default app.render();
