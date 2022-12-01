import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const t = initTRPC.create();

const adjectiveList: string[] = [
  'big',
  'small',
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'black',
  'white',
  'brown',
  'grey',
  'pink',
  'golden',
  'silver',
  'bronze',
  'platinum',
  'happy',
  'sad',
  'angry',
  'confused',
  'confident',
  'shy',
  'quiet',
  'loud',
  'fast',
  'slow',
  'quick',
  'slow',
  'tall',
  'short',
  'long',
  'short',
];
const appRouter = t.router({
  randomAdjective: t.procedure
    // The input is unknown at this time.
    // A client could have sent us anything
    // so we won't assume a certain data type.

    .query(() => {
      return adjectiveList[Math.floor(Math.random() * adjectiveList.length)];
    }),
});

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2023);

export type AppRouter = typeof appRouter;
