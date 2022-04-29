import { useMantineColorScheme, ActionIcon, Header } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

export const AppHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return <Header height={60} p="xs">
    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
      {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
    </ActionIcon>
  </Header>;
}
