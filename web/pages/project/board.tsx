import { Badge, Card, Grid, Group, Paper, Text } from "@mantine/core";
import * as React from "react";

import { DragDropContext, Draggable, Droppable } from "../../components/dnd";

interface TaskProps {
  id: string;
  index: number;
}

const Task = ({ id, index }: TaskProps) => (
  <Draggable draggableId={id} index={index}>
    {(dragProvided, dragSnapshot) => (
      <div
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
      >
        <Card mb="sm" sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        })}>
          <Group position="left">
            <Badge sx={() => ({
              lineHeight: 24,
              height: 24,
            })}>{id}</Badge>
            <Text size="sm">Do something</Text>
          </Group>
          <Text>this is it</Text>
          <Group position="apart">
            <Text>Task</Text>
            <Badge>Up</Badge>
          </Group>
        </Card>
      </div>
    )}
  </Draggable>
);

interface StatusLaneProps {
  name: string;
  id: string;
}
const StatusLane = ({ children, name, id }: React.PropsWithChildren<StatusLaneProps>) => (
  <Droppable droppableId={id} key={id}>
    {(dropProvided, dropSnapshot) => (
      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
        <Card sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
          height: '100%'
        })}>
          <Card.Section p="sm">
            <Text>{name}</Text>
          </Card.Section>
          {children}
          {dropProvided.placeholder}
        </Card>
      </div>
    )}
  </Droppable>
);

const Board = () => {
  return <DragDropContext onDragEnd={() => console.log('drag end')}>
    <Grid align="stretch" sx={() => ({ position: 'relative', })}>
      <Grid.Col span={3}>
        <StatusLane name="Backlog" id="backlog">
          <Task id="TASK-1" index={0}/>
          <Task id="TASK-2" index={1}/>
          <Task id="TASK-3" index={2}/>
        </StatusLane>
      </Grid.Col>
      <Grid.Col span={3}>
        <StatusLane name="Ready for development" id="ready-for-dev">
          <Task id="TASK-4" index={3}/>
          <Task id="TASK-5" index={4}/>
          <Task id="TASK-6" index={5}/>
        </StatusLane>
      </Grid.Col>
      <Grid.Col span={3}>
        <StatusLane name="In progress" id="in-progress">
          <Task id="TASK-7" index={6}/>
          <Task id="TASK-8" index={7}/>
        </StatusLane>
      </Grid.Col>
      <Grid.Col span={3}>
        <StatusLane name="Done" id="done">
          <Task id="TASK-9" index={8}/>
        </StatusLane>
      </Grid.Col>
    </Grid>
  </DragDropContext>;
}

export default Board;
