import { Link, useSubmit, useFetcher, Form } from '@remix-run/react';
import { ActionFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { useEffect } from 'react';

export async function loader() {
  await new Promise((r) => setTimeout(r, 200));
  return json({ ok: true });
}

export async function action({request}: ActionFunctionArgs) {
  const data = await request.formData();
  const duration = data.get('duration');
  const timeout = typeof duration === 'string' ? Number(duration) : 2000;
  await new Promise((r) => setTimeout(r, timeout));
  return json({ answer: 'pong', after: timeout });
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
      <Form method="post" className="flex items-end gap-2">
      <label className="flex flex-col">
        <span className="pl-2">Response time:</span>
        <input type="number" name="duration" defaultValue={2000}></input>
      </label>
      <input type="submit"
        className="bg-red-500 border-red-800 hover:bg-red-800 text-white px-8 py-1"
        value="Submit"
      />
       
      </Form>
      <Link className="hover:underline" to="/page2">
        Go to Page 2
      </Link>
    </main>
  );
}
