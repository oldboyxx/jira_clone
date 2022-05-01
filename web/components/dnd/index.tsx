import dynamic from 'next/dynamic';
import { DragDropContextProps, DraggableProps, DroppableProps } from 'react-beautiful-dnd';

export const DragDropContext = dynamic<DragDropContextProps>(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.DragDropContext;
    }),
  {ssr: false},
);

export const Droppable = dynamic<DroppableProps>(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Droppable;
    }),
  {
    ssr: false,
    loading: () => <>loading</>,
  },
);

export const Draggable = dynamic<DraggableProps>(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Draggable;
    }),
  {ssr: false},
);