import {
  Link,
  useSubmit,
  useFetcher,
  Form,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useEffect } from "react";

export async function loader() {
  await new Promise((r) => setTimeout(r, 200));
  return json({ ok: true });
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const duration = data.get("duration");
  const timeout = typeof duration === "string" ? Number(duration) : 2000;
  await new Promise((r) => setTimeout(r, timeout));
  return json({ answer: "pong", after: timeout });
}

export const meta: MetaFunction = () => {
  return [{ title: "Page 1" }];
};

export default function Page1() {
  // const fetcher = useFetcher();
  const fetcherForm = useFetcher();

  // useEffect(() => {
  //   if (fetcher.state === "idle" && !fetcher.data) {
  //     fetcher.load("/api/wait/10000");
  //   }
  // }, [fetcher]);

  return (
    <main className="flex flex-col gap-2 items-stretch px-8">
      <h3 className="text-xl mb-5 text-center">Page 1</h3>
      {/* <span className="ext-sm text-gray-500">
        Fetcher in page1 (10 seconds response): {fetcher.state}
      </span> */}
      <fetcherForm.Form method="post">
        <fieldset className="border border-solid border-gray-300 p-4 flex flex-col items-start gap-2">
          <legend>Fetcher form (no navigation)</legend>
          <label className="flex flex-col">
            <span>Response time:</span>
            <input type="number" name="duration" defaultValue={2000}></input>
          </label>
          <input
            type="submit"
            className="bg-red-500 border-red-800 hover:bg-red-800 text-white px-8 py-1 hover:cursor-pointer"
            value={
              fetcherForm.state === "idle"
                ? "Submit"
                : `${fetcherForm.state}...`
            }
          />
        </fieldset>
      </fetcherForm.Form>

      <Form method="post">
        <fieldset className="border border-solid border-gray-300 p-4 flex flex-col items-start gap-2">
          <legend>Form with navigation</legend>
          <label className="flex flex-col">
            <span>Response time:</span>
            <input type="number" name="duration" defaultValue={2000}></input>
          </label>
          <input
            type="submit"
            className="bg-red-500 border-red-800 hover:bg-red-800 text-white px-8 py-1 hover:cursor-pointer"
            value={"Submit"}
          />
        </fieldset>
      </Form>
      <Link className="hover:underline text-center mt-6 text-l" to="/page2">
        Go to Page 2
      </Link>
    </main>
  );
}
