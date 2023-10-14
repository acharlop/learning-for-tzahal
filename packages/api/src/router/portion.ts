import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const portionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => ctx.prisma.portion.findMany({})),

  byChapterId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.portion.findMany({
        where: { chapterId: input.id },
      });
    }),
});
