import { TRPCError } from "@trpc/server";
import { z } from "zod";



import { createTRPCRouter, publicProcedure } from "../trpc";


const createReadingSchema = z.object({
  readerId: z.string(),
  portionId: z.number(),
});

const readingSchema = z.object({
  id: z.number(),
  readerId: z.string(),
})

export const readingRouter = createTRPCRouter({
  all: publicProcedure.query(({ctx}) => ctx.prisma.reading.findMany({})),

  allReadings: publicProcedure.query(async ({ctx}) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({})

    return ctx.prisma.reading.findMany({
      where: {week: settings.week},
      include: {
        portion: {include: {chapter: {include: {book: true}}}},
      },
    })
  }),

  countRemaining: publicProcedure.query(async ({ctx}) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({})
    const [total, count] = await Promise.all([
      ctx.prisma.portion.count({}),
      ctx.prisma.reading.count({
        where: {week: settings.week},
      }),
    ])

    return {settings, remaining: total - count}
  }),

  byUserId: publicProcedure.input(z.object({readerId: z.string()})).query(async ({ctx, input}) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({})

    return ctx.prisma.reading.findMany({
      where: {readerId: input.readerId, AND: {week: settings.week}},
      include: {
        portion: {include: {chapter: {include: {book: true}}}},
      },
      orderBy: {id: 'asc'},
    })
  }),

  byId: publicProcedure.input(readingSchema).query(async ({ctx, input}) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({})

    return ctx.prisma.reading.findFirstOrThrow({
      where: {id: input.id, AND: {readerId: input.readerId, AND: {week: settings.week}}},
      include: {
        portion: {include: {chapter: {include: {book: true}}}},
      },
      orderBy: {id: 'asc'},
    })
  }),

  create: publicProcedure.input(createReadingSchema).mutation(async ({ctx, input}) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({})

    const reading = await ctx.prisma.reading.findFirst({
      where: {portionId: input.portionId, AND: {week: settings.week}},
    })

    if (reading) {
      throw new TRPCError({
        code: 'CONFLICT',
      })
    }

    return ctx.prisma.reading.create({
      data: {...input, week: settings.week},
    })
  }),

  isRead: publicProcedure.input(readingSchema).mutation(async ({ctx, input: {id, readerId}}) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({})

    const reading = await ctx.prisma.reading.findFirst({
      where: {id, AND: {week: settings.week, AND: {readerId}}},
    })

    if (!reading) {
      throw new TRPCError({
        code: 'NOT_FOUND',
      })
    }

    return ctx.prisma.reading.update({
      where: {id},
      data: {isRead: true},
    })
  }),

  delete: publicProcedure.input(readingSchema).mutation(async ({ctx, input: {id, readerId}}) => {
    const settings = await ctx.prisma.settings.findFirstOrThrow({})
    const {week} = settings

    console.log({week})

    const reading = await ctx.prisma.reading.findFirst({
      where: {id, AND: {week, AND: {readerId}}},
    })

    if (!reading) {
      throw new TRPCError({
        code: 'NOT_FOUND',
      })
    }

    return ctx.prisma.reading.delete({
      where: {id},
    })
  }),
})
