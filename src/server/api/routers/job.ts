import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ searchTerm: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { searchTerm } = input;
      return ctx.db.job.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    }),
});
