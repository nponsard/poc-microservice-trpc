// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter as AppRouter1 } from '../word/rpc';
import type { AppRouter as AppRouter2 } from '../adjective/rpc';

import express from 'express';

const ADJECTIVE_SERVICE =
  process.env.ADJECTIVE_SERVICE || 'http://localhost:2023';
const WORD_SERVICE = process.env.WORD_SERVICE || 'http://localhost:2022';
let PORT = parseInt(process.env.PORT || '', 10);

if (isNaN(PORT)) {
  PORT = 3000;
}

// Notice the <AppRouter> generic here.
const wordService = createTRPCProxyClient<AppRouter1>({
  links: [
    httpBatchLink({
      url: WORD_SERVICE,
    }),
  ],
});

const adjectiveService = createTRPCProxyClient<AppRouter2>({
  links: [
    httpBatchLink({
      url: ADJECTIVE_SERVICE,
    }),
  ],
});

const app = express();

app.get('', async (req, res) => {
  const [word, adjective, verb] = await Promise.all([
    wordService.randomWord.query('noun'),
    adjectiveService.randomAdjective.query(),
    wordService.randomWord.query('verb'),
  ]);

  res.json({
    word,
    adjective,
    verb,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
