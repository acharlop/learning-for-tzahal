import { authRouter } from "./router/auth";
import { booksRouter } from "./router/books";
import { chapterRouter } from "./router/chapter";
import { portionRouter } from "./router/portion";
import { postRouter } from "./router/post";
import { readingRouter } from "./router/reading";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  book: booksRouter,
  chapter: chapterRouter,
  portion: portionRouter,
  reading: readingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
