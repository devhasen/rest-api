"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("./store");
const validate_1 = require("./validate");
const router = (0, express_1.Router)();
router.get('/items', (_req, res) => {
    res.json(store_1.store.all());
});
router.get('/items/:id', (req, res) => {
    const item = store_1.store.get(Number(req.params.id));
    if (!item)
        return res.status(404).json({ error: 'not found' });
    res.json(item);
});
router.post('/items', (req, res) => {
    const parsed = validate_1.createSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const item = store_1.store.create(parsed.data.name, parsed.data.price);
    res.status(201).json(item);
});
router.patch('/items/:id', (req, res) => {
    const parsed = validate_1.updateSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const item = store_1.store.update(Number(req.params.id), parsed.data);
    if (!item)
        return res.status(404).json({ error: 'not found' });
    res.json(item);
});
router.delete('/items/:id', (req, res) => {
    if (!store_1.store.remove(Number(req.params.id)))
        return res.status(404).json({ error: 'not found' });
    res.json({ ok: true });
});
exports.default = router;
