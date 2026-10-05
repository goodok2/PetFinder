import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Animal } from '../types';

interface Props {
  animal: Animal;
  similarity?: number;
}

export default function AnimalCard({ animal, similarity }: Props) {
  const isLost = animal.status === 'lost';
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea component={RouterLink} to={`/animals/${animal.id}`} sx={{ height: '100%' }}>
        <Box sx={{ fontSize: 64, textAlign: 'center', py: 2, bgcolor: 'grey.100' }}>{animal.emoji}</Box>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6">{animal.name}</Typography>
            <Chip size="small" color={isLost ? 'error' : 'success'} label={isLost ? 'Потерян' : 'Найден'} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {animal.breed}, {animal.color}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {animal.city} · {animal.date}
          </Typography>
          {similarity !== undefined && (
            <Chip sx={{ mt: 1 }} color="secondary" size="small" label={`Сходство: ${similarity}%`} />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
