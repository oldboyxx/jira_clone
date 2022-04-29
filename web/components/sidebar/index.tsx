import { Navbar, Divider, } from '@mantine/core';
import { Table, Settings, Truck, Bug, FileSpreadsheet, Report, ChartPie, } from 'tabler-icons-react';
import { NavbarButton } from './button';

export const AppNavbar = () => <Navbar width={{ base: 300 }} height={500} p="xs">
  <Navbar.Section grow mt="md">
    <NavbarButton icon={<Table size={16} />} label="Kanban Board" color="blue" />
    <NavbarButton icon={<Settings size={16} />} label="Project settings" color="blue" />
    <Divider my="sm" />
    <NavbarButton icon={<Truck size={16} />} label="Releases" color="blue" isNotImplemented />
    <NavbarButton icon={<Bug size={16} />} label="Issues and filters" color="blue" isNotImplemented />
    <NavbarButton icon={<FileSpreadsheet size={16} />} label="Pages" color="blue" isNotImplemented />
    <NavbarButton icon={<Report size={16} />} label="Reports" color="blue" isNotImplemented />
    <NavbarButton icon={<ChartPie size={16} />} label="Components" color="blue" isNotImplemented />
  </Navbar.Section>
</Navbar>;
