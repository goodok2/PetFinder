import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Stack spacing={2} alignItems="center" py={6}>
      <Typography variant="h3" fontWeight={700}>404</Typography>
      <Typography color="text.secondary">Такой страницы не существует.</Typography>
      <Button variant="contained" component={RouterLink} to="/">На главную</Button>
    </Stack>
  );
}
