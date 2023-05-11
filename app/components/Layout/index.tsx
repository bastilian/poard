import React from 'react';
import { Page, PageSection } from '@patternfly/react-core';
import { GithubIcon } from '@patternfly/react-icons';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Layout: React.FC<React.ReactNode> = ({ children }) => {
  return (
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
  );
};

export default Layout;
