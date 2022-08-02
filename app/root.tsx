import type {
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import pfStyles from '@patternfly/patternfly/patternfly.css';
import style from './styles/index.css';
import Layout from './components/Layout';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: pfStyles },
    { rel: 'stylesheet', href: style },
    {
      rel: "icon",
      href: "/assets/favicon.ico",
      type: "image/ico",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Poard - pull request manager",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>

        <Scripts />
      </body>
    </html>
  );
}
