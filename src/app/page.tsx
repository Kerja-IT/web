import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser";

import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const jobs = await api.job.getAll();

  return (
    <HydrateClient>
      <main className="mx-auto flex max-w-6xl flex-col p-4">
        <h1 className="text-xl">Kerja-IT.com</h1>
        <p className="text-sm">
          IT jobs in Malaysia sourced from various job boards.{" "}
          <span className="text-xs text-gray-500">
            (yes new simplified design)
          </span>
        </p>
        <div>
          {jobs.map((job) => (
            <div key={job.id} className="mt-8">
              <Link
                href={job.url}
                target="_blank"
                className="text-blue-500 visited:text-purple-900 hover:underline"
              >
                {job.title}
              </Link>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(job.createdAt)} ago • {job.source}
              </p>
              <p className="mt-2 text-sm text-gray-800">
                {parse(job.description)}
              </p>
            </div>
          ))}
        </div>
      </main>
    </HydrateClient>
  );
}
