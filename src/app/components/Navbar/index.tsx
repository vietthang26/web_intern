import React from 'react';
import { Navbar as NavbarApp, NavLink } from '@mantine/core';

interface Props {
  opened: boolean;
}

export default function Navbar(props: Props) {
  return (
    <NavbarApp
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      hidden={!props.opened}
    >
      <NavLink label="Menu 1" active />
      <NavLink label="Menu 2" />
      <NavLink label="Menu 3" />
    </NavbarApp>
  );
}
