import { Badge, Card, Grid, Group, Paper, Text } from "@mantine/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { resetServerContext } from 'react-beautiful-dnd';

const useFirstRender = () => {
  const [isFirstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, [isFirstRender]);
  return isFirstRender;
}

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
  // TODO: react-beautiful-dnd has issues when using with next.js
  // https://github.com/atlassian/react-beautiful-dnd/issues/2092
  // https://github.com/atlassian/react-beautiful-dnd/issues/1775
  // This "fix" disables SSR in this component, but still doesn't work
  const isFirstRender = useFirstRender();

  if (isFirstRender) {
    return null;
  }

  return <DragDropContext onDragEnd={() => console.log('drag end')}>
    <Grid align="stretch" sx={() => ({ position: 'relative', })}>
      <Grid.Col span={3}>
        <Droppable droppableId="backlog" key="backlog">
          {(dropProvided, dropSnapshot) => (
            <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
              <StatusLane name="Backlog">
                <Draggable draggableId="task-1234" index={0}>
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <Task />
                    </div>
                  )}
                </Draggable>
                <Task />
                <Task />
              </StatusLane>
            </div>
          )}
        </Droppable>
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
    </Grid>
  </DragDropContext>;
}

export default Board;
