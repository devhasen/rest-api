export type Item = { id: number; name: string; price: number; createdAt: string };

let items: Item[] = [];
let nextId = 1;

export const store = {
  all: () => items,
  get: (id: number) => items.find(i => i.id === id),
  create: (name: string, price: number) => {
    const item: Item = { id: nextId++, name, price, createdAt: new Date().toISOString() };
    items.push(item);
    return item;
  },
  update: (id: number, patch: Partial<Item>) => {
    const i = items.findIndex(x => x.id === id);
    if (i < 0) return null;
    items[i] = { ...items[i], ...patch };
    return items[i];
  },
  remove: (id: number) => {
    const before = items.length;
    items = items.filter(x => x.id !== id);
    return items.length < before;
  },
  reset: () => { items = []; nextId = 1; },
};
