"""Операции с данными (слой работы с БД)."""
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from . import models, schemas


def list_animals(
    db: Session,
    status: str | None = None,
    species: str | None = None,
    city: str | None = None,
    skip: int = 0,
    limit: int = 50,
) -> list[models.Animal]:
    stmt = select(models.Animal).options(selectinload(models.Animal.photos))
    if status:
        stmt = stmt.where(models.Animal.status == status)
    if species:
        stmt = stmt.where(models.Animal.species == species)
    if city:
        stmt = stmt.where(models.Animal.city.ilike(f"%{city}%"))
    stmt = stmt.order_by(models.Animal.created_at.desc(), models.Animal.id.desc())
    return list(db.scalars(stmt.offset(skip).limit(limit)))


def get_animal(db: Session, animal_id: int) -> models.Animal | None:
    return db.get(models.Animal, animal_id)


def create_animal(db: Session, data: schemas.AnimalCreate) -> models.Animal:
    animal = models.Animal(**data.model_dump())
    db.add(animal)
    db.commit()
    db.refresh(animal)
    return animal


def update_animal(db: Session, animal: models.Animal, data: schemas.AnimalUpdate) -> models.Animal:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(animal, field, value)
    db.commit()
    db.refresh(animal)
    return animal


def delete_animal(db: Session, animal: models.Animal) -> None:
    db.delete(animal)  # связанные фотографии удаляются каскадом
    db.commit()


def add_photo(db: Session, animal_id: int, file_name: str) -> models.Photo:
    photo = models.Photo(animal_id=animal_id, file_name=file_name)
    db.add(photo)
    db.commit()
    db.refresh(photo)
    return photo


def get_photo(db: Session, photo_id: int) -> models.Photo | None:
    return db.get(models.Photo, photo_id)


def delete_photo(db: Session, photo: models.Photo) -> None:
    db.delete(photo)
    db.commit()
