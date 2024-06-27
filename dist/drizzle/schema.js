"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksTable = void 0;
// src/schema.ts
const pg_core_1 = require("drizzle-orm/pg-core");
// Books table
exports.BooksTable = (0, pg_core_1.pgTable)("books", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    author: (0, pg_core_1.text)("author").notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
});
