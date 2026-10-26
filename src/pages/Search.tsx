import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import UploadIcon from '@mui/icons-material/CloudUpload';
import AnimalCard from '../components/AnimalCard';
import { animals } from '../data/demo';
import type { SearchResult } from '../types';

// Имитация поиска: реальное сравнение фото появится после интеграции с backend
function fakeSearch(file: File): SearchResult[] {
  return animals
    .map((animal, i) => ({ animal, similarity: 55 + (((file.size % 997) * (i + 7) * 31) % 45) }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 4);
}

export default function Search() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onSearch = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setResults(fakeSearch(file));
      setLoading(false);
    }, 900);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>Поиск по фотографии</Typography>
      <Paper variant="outlined" sx={{ p: 3, maxWidth: 720, width: '100%', mx: 'auto' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" justifyContent="center">
          <Box
            sx={{ width: 200, height: 200, borderRadius: 2, bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
          >
            {preview ? <img src={preview} alt="Предпросмотр" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Typography color="text.secondary">Нет фото</Typography>}
          </Box>
          <Stack spacing={2}>
            <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
              Выбрать фото
              <input hidden type="file" accept="image/*" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResults(null); }} />
            </Button>
            <Button variant="contained" disabled={!file || loading} onClick={onSearch}>
              {loading ? <CircularProgress size={24} /> : 'Найти похожих'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
      {results && (
        <>
          <Alert severity="info" sx={{ maxWidth: 720, mx: 'auto' }}>Демонстрационный режим: результаты сгенерированы для макета интерфейса.</Alert>
          <Typography variant="h6">Найденные совпадения</Typography>
          <Grid container spacing={2} justifyContent="center">
            {results.map((r) => (
              <Grid item xs={12} sm={6} md={3} key={r.animal.id}>
                <AnimalCard animal={r.animal} similarity={r.similarity} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
}
