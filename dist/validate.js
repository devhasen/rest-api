"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.createSchema = void 0;
const zod_1 = require("zod");
exports.createSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().nonnegative(),
});
exports.updateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    price: zod_1.z.number().nonnegative().optional(),
});
