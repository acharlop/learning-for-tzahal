import { z } from "zod";



import { createTRPCRouter, publicProcedure } from "../trpc";

export const chapterRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) =>
    ctx.prisma.chapter.findMany({ include: { book: true } }),
  ),

  byBookId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.chapter.findMany({
        where: { bookId: input.id },
        include: { book: true },
      });
    }),
});
