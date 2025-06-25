"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import qs from "query-string";
import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser";

import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("query");
  const page = searchParams.get("page");

  const getAllJobs = api.job.getAll.useQuery({
    searchTerm: query ?? "",
    page: page ? Number(page) : null,
  });

  const { data, isError, isLoading } = getAllJobs;

  const [input, setInput] = useState(query ?? "");

  useEffect(() => {
    const debouncer = setTimeout(() => {
      router.push(
        `/?${qs.stringify(
          { query: input, page: page },
          { skipEmptyString: true, skipNull: true },
        )}`,
      );
    }, 500);

    return () => clearTimeout(debouncer);
  }, [input, page, router]);

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="text-xl">Kerja-IT.com</h1>
      <p className="text-sm">
        IT jobs in Malaysia sourced from various job boards.{" "}
        <span className="text-xs text-gray-500">
          (yes new simplified design)
        </span>
      </p>

      <form className="mt-4 flex items-center gap-2">
        <Input
          name="query"
          placeholder="Search: Software Engineer"
          className="max-w-md"
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div className="mt-4 text-xs text-gray-500">
        <p>Total: {data?.jobs?.length}</p>
      </div>
      <div className="mt-4">
        {isError && (
          <p className="text-sm text-gray-800">
            Something went wrong, please try again.
          </p>
        )}
        {isLoading && <p className="text-sm text-gray-800">Loading...</p>}
        {data?.jobs?.length === 0 && (
          <p className="text-sm text-gray-800">No jobs found.</p>
        )}
        {data?.jobs &&
          data?.jobs.length > 0 &&
          data?.jobs.map((job) => (
            <div key={job.id} className="mb-8">
              <Link
                href={job.url}
                target="_blank"
                className="text-blue-500 visited:text-purple-900 hover:underline"
              >
                {parse(job.title)}{" "}
                <span className="text-xs text-gray-500">({job.source})</span>
              </Link>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(job.createdAt)} ago
              </p>
              <p className="mt-2 text-sm text-gray-800">
                {parse(job.description)}
              </p>
            </div>
          ))}
      </div>
    </main>
  );
}
