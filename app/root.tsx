import React from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getSession } from '~/services/sessions.server';
import pfStyles from '@patternfly/patternfly/patternfly.css';
import style from './styles/index.css';
import AppContext from './components/AppContext';
import Layout from './components/Layout';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: pfStyles },
    { rel: 'stylesheet', href: style },
    {
      rel: 'icon',
      href: '/assets/favicon.ico',
      type: 'image/ico',
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Poard - pull request manager',
});

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  return session.data?.user ? json(session.data?.user) : null;
};

export default function App() {
  const user = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AppContext preState={{ user }}>
          <Layout>
            <Outlet />
          </Layout>
          <Scripts />
        </AppContext>
      </body>
    </html>
  );
}
