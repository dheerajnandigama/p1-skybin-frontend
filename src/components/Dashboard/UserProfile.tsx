import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

export function Profile() {

    const [userName] = useLocalStorage({ key: 'username', defaultValue: '' });

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
        <Text fw={500}>{userName}</Text>
        <Badge color="pink" variant="light">
          USER
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Student at San Jose State University
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        View Profile
      </Button>
    </Card>
  );
}