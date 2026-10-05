import type { Animal } from '../types';

// Демонстрационные данные (в ЛР №5 будут заменены данными из API)
export const animals: Animal[] = [
  { id: 1, name: 'Барсик', species: 'cat', breed: 'Британская', color: 'серый', status: 'lost', city: 'Стокгольм', date: '2026-09-28', description: 'Серый кот, ошейник синего цвета, откликается на имя.', contact: 'anna@example.com', emoji: '🐱' },
  { id: 2, name: 'Рекс', species: 'dog', breed: 'Овчарка', color: 'чёрно-рыжий', status: 'found', city: 'Уппсала', date: '2026-10-01', description: 'Найден у парка, дружелюбный, без ошейника.', contact: '+46 70 000 00 01', emoji: '🐕' },
  { id: 3, name: 'Мурка', species: 'cat', breed: 'Беспородная', color: 'трёхцветная', status: 'found', city: 'Стокгольм', date: '2026-09-30', description: 'Трёхцветная кошка, около двух лет, чипа нет.', contact: 'lars@example.com', emoji: '🐈' },
  { id: 4, name: 'Бим', species: 'dog', breed: 'Бигль', color: 'белый с коричневым', status: 'lost', city: 'Мальмё', date: '2026-09-25', description: 'Потерялся во время прогулки, на ошейнике жетон.', contact: 'maria@example.com', emoji: '🐶' },
  { id: 5, name: 'Снежок', species: 'cat', breed: 'Сибирская', color: 'белый', status: 'lost', city: 'Гётеборг', date: '2026-10-02', description: 'Пушистый белый кот с голубыми глазами.', contact: '+46 70 000 00 02', emoji: '😺' },
  { id: 6, name: 'Лаки', species: 'dog', breed: 'Лабрадор', color: 'палевый', status: 'found', city: 'Стокгольм', date: '2026-10-03', description: 'Молодой лабрадор, найден возле станции метро.', contact: 'erik@example.com', emoji: '🦮' },
];

export const getAnimalById = (id: number) => animals.find((a) => a.id === id);
