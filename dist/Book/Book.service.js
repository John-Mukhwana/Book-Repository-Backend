"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.updateBookService = exports.createBookService = exports.getBookService = exports.booksService = void 0;
// src/services/book.service.ts
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const booksService = async (limit) => {
    if (limit) {
        return await db_1.default.query.BooksTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.BooksTable.findMany();
};
exports.booksService = booksService;
const getBookService = async (id) => {
    return await db_1.default.query.BooksTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.BooksTable.id, id)
    });
};
exports.getBookService = getBookService;
const createBookService = async (book) => {
    await db_1.default.insert(schema_1.BooksTable).values(book);
    return "Book created successfully";
};
exports.createBookService = createBookService;
const updateBookService = async (id, book) => {
    await db_1.default.update(schema_1.BooksTable).set(book).where((0, drizzle_orm_1.eq)(schema_1.BooksTable.id, id));
    return "Book updated successfully";
};
exports.updateBookService = updateBookService;
const deleteBookService = async (id) => {
    await db_1.default.delete(schema_1.BooksTable).where((0, drizzle_orm_1.eq)(schema_1.BooksTable.id, id));
    return "Book deleted successfully";
};
exports.deleteBookService = deleteBookService;
