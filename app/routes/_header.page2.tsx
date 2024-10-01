import { json, MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export async function loader() {
  await new Promise((r) => setTimeout(r, 200));
  return json({ ok: true });
}

export const meta: MetaFunction = () => {
  return [{ title: 'Page 2' }];
};

export default function Page2() {
  return (
    <main className="flex flex-col items-center">
      <h3 className="text-xl mb-6">Page 2</h3>
      <Link className="hover:underline" to="/page1">
        Go to Page 1
      </Link>
    </main>
  );
}
