import { useEffect, useState } from 'react';
import { useFetcher } from "@remix-run/react";
import { Page, PageSection } from '@patternfly/react-core/dist/umd/react-core';
import { GithubIcon } from '@patternfly/react-icons';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AppContext from '~/utils/appContext';
import { buildFilterValues } from '~/utils';

const REPOSITORY_URL = '/repositories';

const Layout = ({ children }) => {
  const fetcher = useFetcher();
  const filters = buildFilterValues(fetcher?.data || [])
  const [appState, setAppState] = useState({});

  const setNamespacesAppState = (namespace, value) => {
    setAppState((currentAppState) => ({
      ...currentAppState,
      [namespace]: value
    }))
  }

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(REPOSITORY_URL)
    }
  }, [fetcher])

  return (
    <AppContext.Provider value={{
      filters,
      state: {
        current: appState,
        setAppState: setNamespacesAppState,
      }
    }}>
      <Page header={<Header />} sidebar={<Sidebar />}>
        <PageSection id='main' style={{ overflowY: 'auto', height: '100%' }}>
          {children}
          <footer style={{ color: 'grey', textAlign: 'center' }}>
            Made with 🎧 | <a href="https://github.com/bastilian/poard"><GithubIcon size="sm" /></a>
          </footer>
        </PageSection>
      </Page>
    </AppContext.Provider>
  );
};

export default Layout;
