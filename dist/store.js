"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
let items = [];
let nextId = 1;
exports.store = {
    all: () => items,
    get: (id) => items.find(i => i.id === id),
    create: (name, price) => {
        const item = { id: nextId++, name, price, createdAt: new Date().toISOString() };
        items.push(item);
        return item;
    },
    update: (id, patch) => {
        const i = items.findIndex(x => x.id === id);
        if (i < 0)
            return null;
        items[i] = { ...items[i], ...patch };
        return items[i];
    },
    remove: (id) => {
        const before = items.length;
        items = items.filter(x => x.id !== id);
        return items.length < before;
    },
    reset: () => { items = []; nextId = 1; },
};
