import { Link, useSubmit, useFetcher } from '@remix-run/react';
import { MetaFunction, json } from '@remix-run/node';
import { useEffect } from 'react';

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return json({ ok: true });
}

export const meta: MetaFunction = () => {
  return [{ title: 'Page 1' }];
};

export default function Page1() {
  const submit = useSubmit();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/api/wait/20000');
    }
  });

  return (
    <main className="flex flex-col gap-2 items-center">
      <h3 className="text-xl mb-5">Page 1</h3>
      <span className="ext-sm text-gray-500">20 seconds: {fetcher.state}</span>
      <button
        className="bg-red-500 border-red-900 text-white px-8"
        onClick={() => {
          submit(
            { msg: 'Hello' },
            { action: '/api/post', method: 'POST', navigate: false }
          );
        }}
      >
        Submit
      </button>
      <Link className="hover:underline" to="/page2">
        Go to Page 2
      </Link>
    </main>
  );
}
