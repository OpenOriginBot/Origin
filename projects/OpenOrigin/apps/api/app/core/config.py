from __future__ import annotations

from functools import lru_cache
from typing import Any, List

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
    def parse_cors_origins(cls, value: Any) -> list[str]:
        if value is None:
            return []

        if isinstance(value, str):
            value = value.strip()
            if not value:
                return []
            if value.startswith('['):
                import json

                parsed = json.loads(value)
                if isinstance(parsed, list):
                    return [str(item).strip() for item in parsed if str(item).strip()]
            return [item.strip() for item in value.split(',') if item.strip()]

        if isinstance(value, list):
            return [str(item).strip() for item in value if str(item).strip()]

        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
