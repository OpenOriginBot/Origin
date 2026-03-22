from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db_session
from app.core.config import get_settings
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientRead
from app.schemas.health import HealthResponse

router = APIRouter()
settings = get_settings()


@router.get('/health', response_model=HealthResponse)
def healthcheck() -> HealthResponse:
    return HealthResponse(status='ok', service=settings.app_name)


@router.get('/clients', response_model=list[ClientRead])
def list_clients(db: Session = Depends(get_db_session)) -> list[Client]:
    return list(db.scalars(select(Client).order_by(Client.id)).all())


@router.post('/clients', response_model=ClientRead)
def create_client(payload: ClientCreate, db: Session = Depends(get_db_session)) -> Client:
    client = Client(name=payload.name, status=payload.status)
    db.add(client)
    db.commit()
    db.refresh(client)
    return client
