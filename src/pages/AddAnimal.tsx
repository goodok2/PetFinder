import { useState } from 'react';
import { Button, MenuItem, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';

export default function AddAnimal() {
  const [done, setDone] = useState(false);

  return (
    <Stack spacing={3} maxWidth={560}>
      <Typography variant="h4" fontWeight={700}>Новое объявление</Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField select label="Статус" defaultValue="lost">
            <MenuItem value="lost">Потерял питомца</MenuItem>
            <MenuItem value="found">Нашёл животное</MenuItem>
          </TextField>
          <TextField select label="Вид" defaultValue="cat">
            <MenuItem value="cat">Кошка</MenuItem>
            <MenuItem value="dog">Собака</MenuItem>
          </TextField>
          <TextField label="Кличка" />
          <TextField label="Порода" />
          <TextField label="Окрас" />
          <TextField label="Город" />
          <TextField label="Описание" multiline minRows={3} />
          <TextField label="Контакт (email или телефон)" />
          <Button variant="outlined" component="label">
            Загрузить фото
            <input hidden type="file" accept="image/*" />
          </Button>
          <Button variant="contained" onClick={() => setDone(true)}>Опубликовать</Button>
        </Stack>
      </Paper>
      <Snackbar open={done} autoHideDuration={3000} onClose={() => setDone(false)} message="Демо: данные пока никуда не отправляются" />
    </Stack>
  );
}
