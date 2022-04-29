import { ThemeIcon, UnstyledButton, Group, Text, createStyles, Badge } from '@mantine/core';

const useStyles = createStyles<string, boolean | undefined>((theme, isNotImplemented, getRef) => ({
  container: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ?  theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
      cursor: isNotImplemented ? 'not-allowed' : undefined,
    },

    [`&:hover .${getRef('label')}`]: {
      display: isNotImplemented ? 'none' : 'block',
    },
    [`& .${getRef('labelNotImplemented')}`]: {
      display: 'none',
    },
    [`&:hover .${getRef('labelNotImplemented')}`]: {
      display: isNotImplemented ? 'block' : undefined,
    },
  },
  label: {
    ref: getRef('label'),
  },
  labelNotImplemented: {
    ref: getRef('labelNotImplemented'),
    cursor: 'not-allowed',
  }
}));

export interface NavbarButtonProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  isNotImplemented?: boolean;
}

export const NavbarButton = ({ color, label, icon, isNotImplemented }: NavbarButtonProps) => {
  const { classes } = useStyles(isNotImplemented);
  return <UnstyledButton className={classes.container}>
    <Group>
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>

      <Text size="sm" className={classes.label}>{label}</Text>
      {isNotImplemented && <Badge color="red" radius="lg" className={classes.labelNotImplemented}>Not implemented</Badge>}
    </Group>
  </UnstyledButton>
};
