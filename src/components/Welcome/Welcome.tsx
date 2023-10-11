import { Title, Text, Anchor } from '@mantine/core';
import { SiAmazoncloudwatch } from 'react-icons/si';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'cyan' }}>
          Sky Bin <SiAmazoncloudwatch color='#2E93F9'/>
        </Text>
      </Title>
    </>
  );
}
