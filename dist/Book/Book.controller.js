"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBook = exports.listBooks = void 0;
const Book_service_1 = require("../Book/Book.service");
const listBooks = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, Book_service_1.booksService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Books not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listBooks = listBooks;
const getBook = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const book = await (0, Book_service_1.getBookService)(id);
    if (book == undefined) {
        return c.text("Book not found", 404);
    }
    return c.json(book, 200);
};
exports.getBook = getBook;
const createBook = async (c) => {
    try {
        const book = await c.req.json();
        console.log(book);
        const createdBook = await (0, Book_service_1.createBookService)(book);
        if (!createdBook)
            return c.text("Book not created", 404);
        return c.json({ msg: createdBook }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createBook = createBook;
const updateBook = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const book = await c.req.json();
    try {
        const searchedBook = await (0, Book_service_1.getBookService)(id);
        if (searchedBook == undefined)
            return c.text("Book not found", 404);
        const res = await (0, Book_service_1.updateBookService)(id, book);
        if (!res)
            return c.text("Book not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const book = await (0, Book_service_1.getBookService)(id);
        if (book == undefined)
            return c.text("Book not found", 404);
        const res = await (0, Book_service_1.deleteBookService)(id);
        if (!res)
            return c.text("Book not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBook = deleteBook;
