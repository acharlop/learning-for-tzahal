import { authRouter } from "./router/auth";
import { booksRouter } from "./router/books";
import { chapterRouter } from "./router/chapter";
import { portionRouter } from "./router/portion";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  book: booksRouter,
  chapter: chapterRouter,
  portion: portionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
