import { env } from "@/env";
import { db } from "@/server/db";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    apiKey: string;
    input: {
      url: string;
      title: string;
      companyName: string;
      location: string;
    };
  };

  if (body.apiKey !== env.CRON_API_KEY) {
    return Response.json({
      received: true,
      status: "failed",
      message: "invalid api key",
    });
  }

  await db.job.create({ data: body.input });
  return Response.json({ received: true });
}
