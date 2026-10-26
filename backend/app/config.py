"""Конфигурация приложения: значения берутся из переменных окружения / файла .env."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    upload_dir: str = "uploads"
    cors_origins: str = "http://localhost:5173"  # несколько адресов через запятую
    max_upload_mb: int = 5

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
