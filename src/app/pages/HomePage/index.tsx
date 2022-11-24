import i18next from 'i18next';
import { i18n } from 'locales/i18n';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'app/components/Header';
import Navbar from 'app/components/Navbar';
import { AppShell, Text, useMantineTheme } from '@mantine/core';
import Footer from 'app/components/Footer';

export function HomePage() {
  const { t, i18n } = useTranslation();
  const [opened, setOpened] = React.useState<boolean>(false);
  const theme = useMantineTheme();

  const dispatch = useDispatch();

  const changeLanguage = () => {
    i18n.changeLanguage('vi');
  };

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={<Navbar opened={opened} />}
        header={<Header />}
        footer={<Footer />}
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Text>Content</Text>
      </AppShell>
    </>
  );
}
