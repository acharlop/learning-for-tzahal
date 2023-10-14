import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const booksRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => ctx.prisma.book.findMany({})),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input: { id } }) =>
      ctx.prisma.book.findUnique({
        where: { id },
      }),
    ),
});
