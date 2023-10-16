import { z } from "zod";



import { createTRPCRouter, publicProcedure } from "../trpc";


export const portionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => ctx.prisma.portion.findMany({})),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.portion.findFirst({
        where: { id: input.id },
        include: { chapter: { include: { book: true } } },
      });
    }),

  unreadByChapterId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const settings = await ctx.prisma.settings.findFirstOrThrow({});

      const [portions, chapter] = await Promise.all([
        ctx.prisma.portion.findMany({
          where: {
            chapterId: input.id,
            AND: { readings: { none: { week: settings.week } } },
          },
          orderBy: { id: "asc" },
          include: {
            readings: true,
          },
        }),
        ctx.prisma.chapter.findFirst({
          where: { id: input.id },
          include: { book: true },
        }),
      ]);

      return { portions, chapter };
    }),
});
