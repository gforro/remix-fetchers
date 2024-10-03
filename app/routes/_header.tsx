import { Outlet, Link, useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export default function Header() {
  const fetcher = useFetcher();
  const fetcher2 = useFetcher();
  const fetcher3 = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/api/wait/4000");
    }
    if (fetcher2.state === "idle" && !fetcher2.data) {
      fetcher2.load("/api/wait/6000");
    }
    if (fetcher3.state === "idle" && !fetcher3.data) {
      fetcher3.load("/api/wait/8000");
    }
  }, [fetcher, fetcher2, fetcher3]);

  return (
    <div className="flex flex-col gap-4 items-stretch">
      <header className="flex flex-col items-center bg-red-100 pb-8">
      <h1 className="text-2xl">Header</h1>
      <div className="flex flex-col items-start">
        <h5 className="text-xl">Fetchers in header with response times</h5>
        <span className="text-sm text-gray-500">
          4 seconds: {fetcher.state}
        </span>
        <span className="text-sm text-gray-500">
          6 seconds: {fetcher2.state}
        </span>
        <span className="text-sm text-gray-500">
          8 seconds: {fetcher3.state}
        </span>
      </div>
      </header>
      <Outlet />
    </div>
  );
}
