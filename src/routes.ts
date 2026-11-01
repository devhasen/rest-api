import { Router, Request, Response } from 'express';
import { store } from './store';
import { createSchema, updateSchema } from './validate';

const router = Router();

router.get('/items', (_req: Request, res: Response) => {
  res.json(store.all());
});

router.get('/items/:id', (req: Request, res: Response) => {
  const item = store.get(Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

router.post('/items', (req: Request, res: Response) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = store.create(parsed.data.name, parsed.data.price);
  res.status(201).json(item);
});

router.patch('/items/:id', (req: Request, res: Response) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = store.update(Number(req.params.id), parsed.data);
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

router.delete('/items/:id', (req: Request, res: Response) => {
  if (!store.remove(Number(req.params.id))) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

export default router;
