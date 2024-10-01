import { json } from '@remix-run/react';

export async function action() {
  await new Promise((r) => setTimeout(r, 2000));
  return json({ answer: 'pong' });
}
