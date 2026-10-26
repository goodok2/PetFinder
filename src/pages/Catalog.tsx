import { useMemo, useState } from 'react';
import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import AnimalCard from '../components/AnimalCard';
import { animals } from '../data/demo';

export default function Catalog() {
  const [status, setStatus] = useState('all');
  const [species, setSpecies] = useState('all');
  const [city, setCity] = useState('');

  const filtered = useMemo(
    () =>
      animals.filter(
        (a) =>
          (status === 'all' || a.status === status) &&
          (species === 'all' || a.species === species) &&
          a.city.toLowerCase().includes(city.trim().toLowerCase()),
      ),
    [status, species, city],
  );

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>Каталог объявлений</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
        <TextField select label="Статус" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="lost">Потерянные</MenuItem>
          <MenuItem value="found">Найденные</MenuItem>
        </TextField>
        <TextField select label="Вид" value={species} onChange={(e) => setSpecies(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="cat">Кошки</MenuItem>
          <MenuItem value="dog">Собаки</MenuItem>
        </TextField>
        <TextField label="Город" value={city} onChange={(e) => setCity(e.target.value)} />
      </Stack>
      {filtered.length === 0 ? (
        <Typography color="text.secondary">Ничего не найдено.</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filtered.map((a) => (
            <Grid item xs={12} sm={6} md={4} key={a.id}>
              <AnimalCard animal={a} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
