import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

export function Profile() {

    const [userName] = useLocalStorage({ key: 'username', defaultValue: '' });
    const [value, setValue] = useLocalStorage({ key: 'userid', defaultValue: '' });
    const [fname, setFname] = useLocalStorage({ key: 'fname', defaultValue: '' });
    const [lname, setLname] = useLocalStorage({ key: 'lname', defaultValue: '' });


  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{marginLeft: '15px', marginBottom: '30px', marginTop: '30px' , height: '400px'}}>
      <Card.Section>
        <Image
          src="https://png.pngtree.com/thumb_back/fw800/background/20230613/pngtree-an-icon-with-a-man-in-a-jacket-image_2955441.jpg"
          height={250}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{`${fname} ${lname}`}</Text>
        <Badge color={value==='546ef019-d04b-4db0-8f81-b93bbb5ae1a7'?'red':'blue'} variant="light">
          {value==='546ef019-d04b-4db0-8f81-b93bbb5ae1a7'?'ADMIN':'USER'}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {userName}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        View Profile
      </Button>
    </Card>
  );
}