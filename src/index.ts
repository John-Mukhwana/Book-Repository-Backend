// import { serve } from '@hono/node-server'
// import { Hono } from 'hono'
// import "dotenv/config"
// import { logger } from 'hono/logger'
// import { csrf } from 'hono/csrf'
// import { trimTrailingSlash } from 'hono/trailing-slash'
// import { timeout } from 'hono/timeout'
// import { HTTPException } from 'hono/http-exception'
// import { prometheus } from '@hono/prometheus'

// import { bookRouter } from './Book/Book.router'



// const app = new Hono().basePath('/api')

// const customTimeoutException = () =>
//   new HTTPException(408, {
//     message: `Request timeout after waiting for more than 10 seconds`,
//   })

// const { printMetrics, registerMetrics } = prometheus()

// // inbuilt middlewares
// app.use(logger())  //logs request and response to the console
// app.use(csrf()) //prevents CSRF attacks by checking request headers.
// app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
// app.use('/', timeout(10000, customTimeoutException))
// //3rd party middlewares
// app.use('*', registerMetrics)


// // default route
// app.get('/ok', (c) => {
//   return c.text('The server is running📢😏😏😏!')
// })
// app.get('/timeout', async (c) => {
//   await new Promise((resolve) => setTimeout(resolve, 11000))
//   return c.text("data after 5 seconds", 200)
// })
// app.get('/metrics', printMetrics)

// // custom route
// app.route("/", bookRouter)   // /books



// serve({
//   fetch: app.fetch,
//   port: Number(process.env.PORT)
// })
// console.log(`Server is running on port ${process.env.PORT}`)

// index.tsx
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import "dotenv/config";
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { timeout } from 'hono/timeout';
import { HTTPException } from 'hono/http-exception';
import { prometheus } from '@hono/prometheus';
import {cors} from 'hono/cors'

import { bookRouter } from './Book/Book.router';

const app = new Hono().basePath('/api');
// app.use('/*', cors())
app.use('*', cors({
  origin: ['http://localhost:5174', 'https://book-repository-apllication-reactjs.vercel.app','http://localhost:5173'], // Your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));


const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  });

const { printMetrics, registerMetrics } = prometheus();

// inbuilt middlewares
app.use(logger());  // logs request and response to the console
app.use(csrf()); // prevents CSRF attacks by checking request headers
app.use(trimTrailingSlash()); // removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException));
// 3rd party middlewares
app.use('*', registerMetrics);

// default route
app.get('/ok', (c) => {
  return c.text('The server is running📢😏😏😏!');
});
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000));
  return c.text("data after 5 seconds", 200);
});
app.get('/metrics', printMetrics);

// custom route
app.route("/", bookRouter);   // /api/books

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT),
});
console.log(`Server is running on port ${process.env.PORT}`);
