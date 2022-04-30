import { Badge, Card, Grid, Group, Paper, Text } from "@mantine/core";
import * as React from "react";

const Task = () => {
  return <Card mb="sm" sx={(theme) => ({
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
  })}>
    <Group position="left">
      <Badge sx={() => ({
        lineHeight: 24,
        height: 24,
      })}>SFC-1999</Badge>
      <Text size="sm">Do something</Text>
    </Group>
    <Text>this is it</Text>
    <Group position="apart">
      <Text>Task</Text>
      <Badge>Up</Badge>
    </Group>
  </Card>;
}

const StatusLane = ({ children, name }: React.PropsWithChildren<{ name: string }>) => (
  <Card sx={(theme) => ({
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    height: '100%'
  })}>
    <Card.Section p="sm">
      <Text>{name}</Text>
    </Card.Section>
    {children}
  </Card>
);

const Board = () => {
  return <Grid align="stretch" sx={() => ({ position: 'relative', })}>
    <Grid.Col span={3}>
      <StatusLane name="Backlog">
        <Task />
        <Task />
        <Task />
      </StatusLane>
    </Grid.Col>
    <Grid.Col span={3}>
      <StatusLane name="Ready for development">
        <Task />
        <Task />
        <Task />
      </StatusLane>
    </Grid.Col>
    <Grid.Col span={3}>
      <StatusLane name="In progress">
        <Task />
        <Task />
      </StatusLane>
    </Grid.Col>
    <Grid.Col span={3}>
      <StatusLane name="Done">
        <Task />
      </StatusLane>
    </Grid.Col>
  </Grid>;
}

export default Board;
