import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { Link as RouterLink, NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/search', label: 'Поиск по фото' },
  { to: '/animals', label: 'Каталог' },
  { to: '/add', label: 'Добавить' },
];

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ flexWrap: 'wrap', gap: 1 }}>
          <PetsIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
            PetFinder
          </Typography>
          {links.map((l) => (
            <Button
              key={l.to}
              color="inherit"
              component={NavLink}
              to={l.to}
              sx={{ '&.active': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              {l.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
