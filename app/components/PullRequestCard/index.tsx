
import { Card, CardBody, CardFooter, CardTitle, Grid, GridItem, Label, Text } from '@patternfly/react-core/dist/umd/react-core';
import { formatDistance } from 'date-fns';
import Avatar from 'react-avatar';
import UpdateBy from './components/UpdatedBy';
import CustomPullRequestTags from './components/CustomPullRequestTags';
import { age, labelColor } from './helpers';

const PullRequestCard = (pullRequest) => {
  const { title, updatedAt, createdAt, author, number, body, url, repository, ...rest } = pullRequest;
  // TODO Fix date calculations
  const updatedAtDate = updatedAt && new Date(updatedAt);
  const createdAtDate = createdAt && new Date(createdAt);
  const modifiedAt = updatedAtDate || createdAtDate || new Date();

  return (
    <GridItem span={4}>
      <Card isRounded>
        <CardTitle>
          <Grid>
            <GridItem span={11}>
              <Avatar githubHandle={author.username} size="30" className="avatar" unstyled />
              <a target="_blank" href={url} rel="noreferrer">
                {title}
              </a>
            </GridItem>
            <GridItem span={1} style={{ textAlign: 'right' }}>
              <Label color={labelColor(modifiedAt)}>{age(modifiedAt)}</Label>
            </GridItem>
          </Grid>
        </CardTitle>
        <CardBody>

          {/* // TODO Find a better place to link the repo. maybe just the header?
            <a href={'https://github.com/' + repository?.name?.toLowerCase()}>
            <Label variant="outline" color="grey" icon={<RepositoryIcon />}>
              {repository?.name?.replace('RedHatInsights/', '')}
            </Label>
          </a> */}

          {/* TODO put pullrequest labels here. */}

          <CustomPullRequestTags pullRequest={pullRequest} />

        </CardBody>
        <CardFooter>
          <Text component="small" style={{ color: 'lightgrey' }}>
            <UpdateBy reporter={author?.username} />{' '}
            {modifiedAt ? formatDistance(new Date(modifiedAt * 1000), new Date(), { addSuffix: true }) : ''}
          </Text>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default PullRequestCard;
