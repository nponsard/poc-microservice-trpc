// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter as AppRouter1 } from '../hello1/rpc';
import type { AppRouter as AppRouter2 } from '../hello2/rpc';

import express from 'express';

// Notice the <AppRouter> generic here.
const hello1 = createTRPCProxyClient<AppRouter1>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2022',
    }),
  ],
});

const hello2 = createTRPCProxyClient<AppRouter2>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2023',
    }),
  ],
});

const app = express();

app.get('', async (req, res) => {
  const [word, adjective, verb] = await Promise.all([
    hello1.randomWord.query('noun'),
    hello2.randomAdjective.query(),
    hello1.randomWord.query('verb'),
  ]);

  res.json({
    word,
    adjective,
    verb,
  });
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
