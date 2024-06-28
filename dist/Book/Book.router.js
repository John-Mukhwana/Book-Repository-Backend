"use strict";
// // src/routes/book.router.ts
// import { Hono } from "hono";
// import { listBooks, getBook, createBook, updateBook, deleteBook } from "../Book/Book.controller";
// import { zValidator } from "@hono/zod-validator";
// import { bookSchema } from '../validators';
// export const bookRouter = new Hono();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
// bookRouter.get("/books", listBooks);
// bookRouter.get("/books/:id", getBook);
// bookRouter.post("/books", zValidator('json', bookSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400);
//     }
// }), createBook);
// bookRouter.put("/books/:id", updateBook);
// bookRouter.delete("/books/:id", deleteBook);
// Book.router.ts
const hono_1 = require("hono");
const Book_controller_1 = require("./Book.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.bookRouter = new hono_1.Hono();
// Get all books
exports.bookRouter.get("/books", Book_controller_1.listBooks);
// Get a single book by ID
exports.bookRouter.get("/books/:id", Book_controller_1.getBook);
// Create a new book
exports.bookRouter.post("/books", (0, zod_validator_1.zValidator)('json', validators_1.bookSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Book_controller_1.createBook);
// Update an existing book by ID
exports.bookRouter.put("/books/:id", Book_controller_1.updateBook);
// Delete a book by ID
exports.bookRouter.delete("/books/:id", Book_controller_1.deleteBook);
