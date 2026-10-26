"""Pydantic-схемы: валидация входных данных и формат ответов."""
from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

Species = Literal["cat", "dog"]
Status = Literal["lost", "found"]


def _not_in_future(value: date | None) -> date | None:
    if value is not None and value > date.today():
        raise ValueError("Дата не может быть в будущем")
    return value


class AnimalCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    species: Species
    breed: str | None = Field(default=None, max_length=100)
    color: str = Field(min_length=1, max_length=100)
    status: Status
    city: str = Field(min_length=1, max_length=100)
    event_date: date
    description: str = Field(default="", max_length=2000)
    contact: str = Field(min_length=3, max_length=150)

    _check_date = field_validator("event_date")(_not_in_future)


class AnimalUpdate(BaseModel):
    """Частичное обновление: передаются только изменяемые поля."""

    name: str | None = Field(default=None, min_length=1, max_length=100)
    species: Species | None = None
    breed: str | None = Field(default=None, max_length=100)
    color: str | None = Field(default=None, min_length=1, max_length=100)
    status: Status | None = None
    city: str | None = Field(default=None, min_length=1, max_length=100)
    event_date: date | None = None
    description: str | None = Field(default=None, max_length=2000)
    contact: str | None = Field(default=None, min_length=3, max_length=150)

    _check_date = field_validator("event_date")(_not_in_future)


class PhotoRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    animal_id: int
    file_name: str  # файл доступен по адресу /uploads/<file_name>
    created_at: datetime


class AnimalRead(AnimalCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    photos: list[PhotoRead] = []
