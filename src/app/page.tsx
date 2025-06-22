import Form from "next/form";
import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  const jobs = await api.job.getAll({ searchTerm: query ?? "" });

  return (
    <HydrateClient>
      <main className="mx-auto max-w-6xl p-4">
        <h1 className="text-xl">Kerja-IT.com</h1>
        <p className="text-sm">
          IT jobs in Malaysia sourced from various job boards.{" "}
          <span className="text-xs text-gray-500">
            (yes new simplified design)
          </span>
        </p>

        <Form action="/" className="mt-4 flex items-center gap-2">
          <Input
            name="query"
            placeholder="Search: Software Engineer"
            className="max-w-md"
            type="search"
            defaultValue={query}
          />
          <Button type="submit">Search</Button>
          {Boolean(query) && (
            <Button variant="ghost" asChild>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/">Reset</a>
            </Button>
          )}
        </Form>
        <div className="mt-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="mb-8">
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
            ))
          ) : (
            <p className="text-sm text-gray-800">No jobs found.</p>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
