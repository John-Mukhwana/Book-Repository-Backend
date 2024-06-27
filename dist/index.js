"use strict";
// import { serve } from '@hono/node-server'
// import { Hono } from 'hono'
// import "dotenv/config"
// import { logger } from 'hono/logger'
// import { csrf } from 'hono/csrf'
// import { trimTrailingSlash } from 'hono/trailing-slash'
// import { timeout } from 'hono/timeout'
// import { HTTPException } from 'hono/http-exception'
// import { prometheus } from '@hono/prometheus'
Object.defineProperty(exports, "__esModule", { value: true });
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
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const timeout_1 = require("hono/timeout");
const http_exception_1 = require("hono/http-exception");
const prometheus_1 = require("@hono/prometheus");
const Book_router_1 = require("./Book/Book.router");
const app = new hono_1.Hono().basePath('/api');
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
});
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// inbuilt middlewares
app.use((0, logger_1.logger)()); // logs request and response to the console
app.use((0, csrf_1.csrf)()); // prevents CSRF attacks by checking request headers
app.use((0, trailing_slash_1.trimTrailingSlash)()); // removes trailing slashes from the request URL
app.use('/', (0, timeout_1.timeout)(10000, customTimeoutException));
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
app.route("/", Book_router_1.bookRouter); // /api/books
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT),
});
console.log(`Server is running on port ${process.env.PORT}`);
