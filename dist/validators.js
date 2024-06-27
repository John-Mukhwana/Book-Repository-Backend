"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const zod_1 = require("zod");
exports.bookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    year: zod_1.z.number().int().min(1000, "Year must be a valid four-digit number").max(new Date().getFullYear(), "Year cannot be in the future"),
});
