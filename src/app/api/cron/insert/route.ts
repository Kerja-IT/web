import { env } from "@/env";
import { db } from "@/server/db";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    apiKey: string;
    input: {
      url: string;
      title: string;
      description: string;
    }[];
  };

  if (body.apiKey !== env.CRON_API_KEY) {
    return Response.json({
      received: true,
      status: "failed",
      message: "invalid api key",
    });
  }

  await db.job.createMany({ data: body.input });
  return Response.json({ received: true });
}
