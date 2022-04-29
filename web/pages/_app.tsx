import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, AppShell, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { AppNavbar } from '../components/sidebar';
import { useToggle } from '@mantine/hooks';
import { AppHeader } from '../components/header';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>('light', ['light', 'dark']);

  return (
    <>
      <Head>
        <title>Jira Clone</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>


      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme
          }}
        >
          <AppShell
            padding="md"
            navbar={<AppNavbar />}
            header={<AppHeader />}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
