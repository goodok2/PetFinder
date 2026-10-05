export type Species = 'cat' | 'dog';
export type AnimalStatus = 'lost' | 'found';

export interface Animal {
  id: number;
  name: string;
  species: Species;
  breed: string;
  color: string;
  status: AnimalStatus;
  city: string;
  date: string;
  description: string;
  contact: string;
  emoji: string;
}

export interface SearchResult {
  animal: Animal;
  similarity: number; // 0..100
}
