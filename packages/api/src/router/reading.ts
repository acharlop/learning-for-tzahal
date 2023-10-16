import { TRPCError } from "@trpc/server";
import { z } from "zod";



import { createTRPCRouter, publicProcedure } from "../trpc";

const createReadingSchema = z.object({
  readerId: z.string(),
  portionId: z.number(),
});

const updateReadingSchema = z.object({
  id: z.number(),
  readerId: z.string(),
});

export const readingRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => ctx.prisma.reading.findMany({})),

  countRemaining: publicProcedure.query(async ({ ctx }) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({});
    const [total, count] = await Promise.all([
      ctx.prisma.portion.count({}),
      ctx.prisma.reading.count({
        where: { week: settings.week },
      }),
    ]);

    return { settings, remaining: total - count };
  }),

  byUserId: publicProcedure
    .input(z.object({ readerId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.reading.findMany({
        where: { readerId: input.readerId },
        include: {
          portion: { include: { chapter: { include: { book: true } } } },
        },
      });
    }),

  create: publicProcedure
    .input(createReadingSchema)
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.prisma.settings.findFirstOrThrow({});

      return ctx.prisma.reading.create({
        data: { ...input, week: settings.week },
      });
    }),

  isRead: publicProcedure
    .input(updateReadingSchema)
    .mutation(async ({ ctx, input: { id, readerId } }) => {
      const reading = await ctx.prisma.reading.findFirst({});
      if (reading?.readerId !== readerId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      return ctx.prisma.reading.update({
        where: { id },
        data: { isRead: true },
      });
    }),

  delete: publicProcedure
    .input(updateReadingSchema)
    .mutation(async ({ ctx, input: { id, readerId } }) => {
      const reading = await ctx.prisma.reading.findFirst({});
      if (reading?.readerId !== readerId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      return ctx.prisma.reading.delete({
        where: { id },
      });
    }),
});
