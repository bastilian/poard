import { useState } from 'react'
import { Divider, Grid, GridItem, Label, Panel, PanelHeader, PanelMain, PanelMainBody, Title } from '@patternfly/react-core/dist/umd/react-core';
import { ThumbtackIcon } from '@patternfly/react-icons';

import PullRequestCard from '../PullRequestCard';

const RepositoryPanel = ({ repositoryName, data: { pullRequests = [] } }) => {
  const [showPin, setShowPin] = useState(false);

  return <Panel>
    <PanelHeader>
      <Grid>
        <GridItem span={10} onMouseOver={() => setShowPin(true)} onMouseOut={() => setShowPin(false)}>
          <Title headingLevel="h2">
            {showPin && <ThumbtackIcon color="lightgrey" />}{' '}
            {repositoryName}
          </Title>
        </GridItem>
        <GridItem span={2}>
          <Label color="grey" style={{ float: 'right' }}>{pullRequests.length}</Label>
        </GridItem>
      </Grid>
    </PanelHeader>
    <Divider />
    <PanelMain style={{ background: 'var(--pf-c-page__main-section--BackgroundColor', paddingBottom: '2em' }}>
      <PanelMainBody>
        <Grid hasGutter span={3}>
          {pullRequests.map((pullrequest) =>
            <PullRequestCard key={`pr-${pullrequest.id}`} {...pullrequest} />
          )}
        </Grid>
      </PanelMainBody>
    </PanelMain>
  </Panel>
};

export default RepositoryPanel;
