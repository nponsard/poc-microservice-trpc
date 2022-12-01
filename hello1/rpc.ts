import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const t = initTRPC.create();
interface Word {
  type: 'verb' | 'noun';
  word: string;
}
const wordsList: Word[] = [
  { type: 'verb', word: 'run' },
  { type: 'verb', word: 'jump' },
  { type: 'verb', word: 'walk' },
  { type: 'verb', word: 'swim' },
  { type: 'verb', word: 'fly' },
  { type: 'verb', word: 'dance' },
  { type: 'verb', word: 'sing' },
  { type: 'verb', word: 'talk' },
  { type: 'verb', word: 'eat' },
  { type: 'verb', word: 'sleep' },
  { type: 'verb', word: 'drink' },
  { type: 'verb', word: 'code' },
  { type: 'verb', word: 'read' },
  { type: 'verb', word: 'write' },
  { type: 'verb', word: 'listen' },
  { type: 'verb', word: 'watch' },
  { type: 'verb', word: 'play' },
  { type: 'verb', word: 'work' },
  { type: 'verb', word: 'study' },
  { type: 'verb', word: 'teach' },
  { type: 'verb', word: 'learn' },
  { type: 'verb', word: 'think' },
  { type: 'verb', word: 'feel' },

  { type: 'noun', word: 'dog' },
  { type: 'noun', word: 'cat' },
  { type: 'noun', word: 'bird' },
  { type: 'noun', word: 'fish' },
  { type: 'noun', word: 'mouse' },
  { type: 'noun', word: 'elephant' },
  { type: 'noun', word: 'lion' },
  { type: 'noun', word: 'tiger' },
  { type: 'noun', word: 'bear' },
  { type: 'noun', word: 'monkey' },
  { type: 'noun', word: 'horse' },
  { type: 'noun', word: 'cow' },
  { type: 'noun', word: 'pig' },
  { type: 'noun', word: 'sheep' },
  { type: 'noun', word: 'goat' },
  { type: 'noun', word: 'chicken' },
  { type: 'noun', word: 'duck' },
  { type: 'noun', word: 'frog' },
  { type: 'noun', word: 'snake' },
  { type: 'noun', word: 'rabbit' },
  { type: 'noun', word: 'deer' },
  { type: 'noun', word: 'wolf' },
  { type: 'noun', word: 'fox' },
  { type: 'noun', word: 'giraffe' },
  { type: 'noun', word: 'zebra' },
  { type: 'noun', word: 'kangaroo' },
  { type: 'noun', word: 'koala' },
  { type: 'noun', word: 'panda' },
];
const appRouter = t.router({
  randomWord: t.procedure
    // The input is unknown at this time.
    // A client could have sent us anything
    // so we won't assume a certain data type.
    .input((val: unknown) => {
      // If the value is of type string, return it.
      // TypeScript now knows that this value is a string.
      if (typeof val === 'string' && (val === 'verb' || val === 'noun'))
        return val;
      // Uh oh, looks like that input wasn't a string.
      // We will throw an error instead of running the procedure.
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      const filteredWords = wordsList.filter((word) => word.type === input);
      return filteredWords[Math.floor(Math.random() * filteredWords.length)]
        .word;
    }),
});

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);

export type AppRouter = typeof appRouter;
