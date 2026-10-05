import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const steps = [
  { title: '1. Загрузите фото', text: 'Снимок питомца, которого вы потеряли или нашли.' },
  { title: '2. Получите совпадения', text: 'Система сравнит снимок с базой и покажет похожих животных.' },
  { title: '3. Свяжитесь с автором', text: 'Откройте карточку и найдите контакты владельца или нашедшего.' },
];

export default function Home() {
  return (
    <Stack spacing={4}>
      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: 32, md: 48 } }}>
          Найдите потерянного питомца по фото
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Загрузите снимок — мы найдём похожих животных в базе объявлений.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="contained" size="large" startIcon={<SearchIcon />} component={RouterLink} to="/search">
            Искать по фото
          </Button>
          <Button variant="outlined" size="large" component={RouterLink} to="/add">
            Добавить объявление
          </Button>
        </Stack>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {steps.map((s) => (
          <Card key={s.title} variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{s.title}</Typography>
              <Typography color="text.secondary">{s.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
