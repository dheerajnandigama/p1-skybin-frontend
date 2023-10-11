import { Title, Text, Anchor, Flex } from '@mantine/core';
import { SiAmazoncloudwatch } from 'react-icons/si';
import { Image } from '@mantine/core';
import classes from './Welcome.module.css';
import myImage from '../../cloud-database-hosting-svgrepo-com.png'

export function Welcome() {
  return (
    <>
    <div style={{'display':'flex','justifyContent':"center",'alignItems':'baseline', gap:'10px'}}>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'cyan' }}>
          Sky Bin 
        </Text>
      </Title>
        <Image src={myImage}  h={120}
      w="auto"
      fit="contain" />
      </div>
    </>
  );
}
