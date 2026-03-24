from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db_session
from app.core.config import get_settings
from app.models.client import Client
from app.models.project import Project
from app.schemas.client import ClientCreate, ClientRead
from app.schemas.health import HealthResponse
from app.schemas.project import ProjectCreate, ProjectRead

router = APIRouter()
settings = get_settings()


@router.get('/health', response_model=HealthResponse)
def healthcheck() -> HealthResponse:
    return HealthResponse(status='ok', service=settings.app_name)


# Clients
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


@router.get('/clients/{client_id}', response_model=ClientRead)
def get_client(client_id: int, db: Session = Depends(get_db_session)) -> Client:
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail='Client not found')
    return client


@router.delete('/clients/{client_id}')
def delete_client(client_id: int, db: Session = Depends(get_db_session)) -> dict:
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail='Client not found')
    db.delete(client)
    db.commit()
    return {'deleted': True}


# Projects
@router.get('/projects', response_model=list[ProjectRead])
def list_projects(db: Session = Depends(get_db_session)) -> list[Project]:
    return list(db.scalars(select(Project).order_by(Project.id)).all())


@router.post('/projects', response_model=ProjectRead)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db_session)) -> Project:
    client = db.get(Client, payload.client_id)
    if not client:
        raise HTTPException(status_code=404, detail='Client not found')
    project = Project(client_id=payload.client_id, name=payload.name, status=payload.status)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get('/projects/{project_id}', response_model=ProjectRead)
def get_project(project_id: int, db: Session = Depends(get_db_session)) -> Project:
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail='Project not found')
    return project


@router.delete('/projects/{project_id}')
def delete_project(project_id: int, db: Session = Depends(get_db_session)) -> dict:
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail='Project not found')
    db.delete(project)
    db.commit()
    return {'deleted': True}
