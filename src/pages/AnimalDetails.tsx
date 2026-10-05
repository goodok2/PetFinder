import { Alert, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getAnimalById } from '../data/demo';

export default function AnimalDetails() {
  const { id } = useParams();
  const animal = getAnimalById(Number(id));

  if (!animal) {
    return (
      <Stack spacing={2}>
        <Alert severity="warning">Животное не найдено.</Alert>
        <Button component={RouterLink} to="/animals" sx={{ alignSelf: 'flex-start' }}>К каталогу</Button>
      </Stack>
    );
  }

  const isLost = animal.status === 'lost';
  return (
    <Stack spacing={2}>
      <Button component={RouterLink} to="/animals" sx={{ alignSelf: 'flex-start' }}>← К каталогу</Button>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Box sx={{ fontSize: 120, textAlign: 'center', bgcolor: 'grey.100', borderRadius: 2, px: 4 }}>{animal.emoji}</Box>
          <Stack spacing={1}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h4" fontWeight={700}>{animal.name}</Typography>
              <Chip color={isLost ? 'error' : 'success'} label={isLost ? 'Потерян' : 'Найден'} />
            </Stack>
            <Typography>Порода: {animal.breed}</Typography>
            <Typography>Окрас: {animal.color}</Typography>
            <Typography>Место: {animal.city}, {animal.date}</Typography>
            <Typography color="text.secondary">{animal.description}</Typography>
            <Typography fontWeight={500}>Контакт: {animal.contact}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
