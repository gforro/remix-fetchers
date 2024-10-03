import { Outlet, Link, useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export default function Header() {
  const fetcher = useFetcher();
  
  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/api/wait/4000");
    }
  }, [fetcher]);

  return (
    <div className="flex flex-col gap-4 items-stretch">
      <header className="flex flex-col items-center bg-red-100 pb-8">
      <h1 className="text-2xl">Header</h1>
      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500">
          Fetcher in header with 4 seconds response time: <span className="font-bold">{fetcher.state}</span>
        </span>
      </div>
      </header>
      <Outlet />
    </div>
  );
}
