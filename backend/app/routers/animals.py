"""Маршруты API: объявления о животных и их фотографии."""
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, Query, Response, UploadFile
from sqlalchemy.orm import Session

from .. import crud, models, schemas
from ..config import settings
from ..database import get_db

router = APIRouter(tags=["animals"])

ALLOWED_TYPES = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}


def _animal_or_404(db: Session, animal_id: int) -> models.Animal:
    animal = crud.get_animal(db, animal_id)
    if animal is None:
        raise HTTPException(status_code=404, detail=f"Животное с id={animal_id} не найдено")
    return animal


def _remove_file(file_name: str) -> None:
    (Path(settings.upload_dir) / file_name).unlink(missing_ok=True)


@router.get("/animals", response_model=list[schemas.AnimalRead])
def list_animals(
    status: schemas.Status | None = None,
    species: schemas.Species | None = None,
    city: str | None = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.list_animals(db, status, species, city, skip, limit)


@router.post("/animals", response_model=schemas.AnimalRead, status_code=201)
def create_animal(data: schemas.AnimalCreate, db: Session = Depends(get_db)):
    return crud.create_animal(db, data)


@router.get("/animals/{animal_id}", response_model=schemas.AnimalRead)
def get_animal(animal_id: int, db: Session = Depends(get_db)):
    return _animal_or_404(db, animal_id)


@router.patch("/animals/{animal_id}", response_model=schemas.AnimalRead)
def update_animal(animal_id: int, data: schemas.AnimalUpdate, db: Session = Depends(get_db)):
    return crud.update_animal(db, _animal_or_404(db, animal_id), data)


@router.delete("/animals/{animal_id}", status_code=204)
def delete_animal(animal_id: int, db: Session = Depends(get_db)):
    animal = _animal_or_404(db, animal_id)
    file_names = [p.file_name for p in animal.photos]
    crud.delete_animal(db, animal)
    for name in file_names:
        _remove_file(name)
    return Response(status_code=204)


@router.post("/animals/{animal_id}/photos", response_model=schemas.PhotoRead, status_code=201)
def upload_photo(animal_id: int, file: UploadFile, db: Session = Depends(get_db)):
    _animal_or_404(db, animal_id)
    ext = ALLOWED_TYPES.get(file.content_type or "")
    if ext is None:
        raise HTTPException(status_code=415, detail="Допустимы только изображения JPEG, PNG или WebP")
    limit = settings.max_upload_mb * 1024 * 1024
    content = file.file.read(limit + 1)
    if len(content) > limit:
        raise HTTPException(status_code=413, detail=f"Файл больше {settings.max_upload_mb} МБ")
    file_name = f"{uuid.uuid4().hex}{ext}"
    (Path(settings.upload_dir) / file_name).write_bytes(content)
    return crud.add_photo(db, animal_id, file_name)


@router.delete("/photos/{photo_id}", status_code=204)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    photo = crud.get_photo(db, photo_id)
    if photo is None:
        raise HTTPException(status_code=404, detail=f"Фото с id={photo_id} не найдено")
    file_name = photo.file_name
    crud.delete_photo(db, photo)
    _remove_file(file_name)
    return Response(status_code=204)
