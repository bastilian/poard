import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const url = new URL(request.url);
  if (url.pathname.search(/^\/assets\//) === 0) {
    try {
      const filePath = path.join(__dirname, '../app/', url.pathname);

      const file = readFileSync(filePath);
      return new Response(file.toString(), {
        status: 200,
      });
    } catch {}
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
