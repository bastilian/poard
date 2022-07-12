
import { Card, CardBody, CardFooter, CardTitle, Grid, GridItem, Label, Text } from '@patternfly/react-core/dist/umd/react-core';
import moment from 'moment';
import Avatar from 'react-avatar';
import UpdateBy from './components/UpdatedBy';
import CustomPullRequestTags from './components/CustomPullRequestTags';
import { age, labelColor } from './helpers';

const PullRequestCard = (pullRequest) => {
  const { title, updatedAt, createdAt, author, number, url } = pullRequest;
  const updatedAtDate = updatedAt && moment(updatedAt);
  const createdAtDate = createdAt && moment(createdAt);
  const modifiedAt = updatedAtDate || createdAtDate;

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
              <Label color={labelColor(modifiedAt.unix())}>{age(modifiedAt.unix())}</Label>
            </GridItem>
          </Grid>
        </CardTitle>
        <CardBody>

          {/* TODO put pullrequest labels here. */}

          <CustomPullRequestTags pullRequest={pullRequest} />

        </CardBody>
        <CardFooter>
          <Text component="small" style={{ color: 'lightgrey' }}>
            {/* TODO This could live somewhere else as well */}
            <UpdateBy reporter={author?.username} />{' '}
            {modifiedAt.fromNow()}
          </Text>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default PullRequestCard;
