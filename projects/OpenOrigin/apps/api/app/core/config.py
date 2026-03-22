from __future__ import annotations

from functools import lru_cache
from typing import List, Union

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    app_name: str = 'OpenOrigin API'
    app_env: str = 'development'
    app_debug: bool = True
    api_v1_prefix: str = '/api/v1'
    database_url: str = 'sqlite+pysqlite:///./openorigin.db'
    cors_origins: List[str] = ['http://localhost:3000']

    @field_validator('cors_origins', mode='before')
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            value = value.strip()
            if value.startswith('['):
                import json
                return json.loads(value)
            return [item.strip() for item in value.split(',') if item.strip()]
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
