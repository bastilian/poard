import React from 'react';
import { Page, PageSection } from '@patternfly/react-core/dist/umd/react-core';
import { GithubIcon } from '@patternfly/react-icons';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AppContext from './components/AppContext';

const Layout: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <AppContext>
      <Page header={<Header />} sidebar={<Sidebar />}>
        <PageSection id="main" style={{ overflowY: 'auto', height: '100%' }}>
          {children}

          <footer style={{ color: 'grey', textAlign: 'center' }}>
            Made with 🎧 |{' '}
            <a href="https://github.com/bastilian/poard">
              <GithubIcon size="sm" />
            </a>
          </footer>
        </PageSection>
      </Page>
    </AppContext>
  );
};

export default Layout;
