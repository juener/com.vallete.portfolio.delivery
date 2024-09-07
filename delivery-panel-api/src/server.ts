import { app } from './app';
import { env } from './env';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT_LOCAL,
  })
  .then(() => {
    console.log(`HTTP Server Running at the port ${env.PORT_LOCAL}.`);
    });
