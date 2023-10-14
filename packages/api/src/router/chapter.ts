import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const chapterRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => ctx.prisma.chapter.findMany({})),

  byBookId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.chapter.findMany({
        where: { bookId: input.id },
      });
    }),
});
