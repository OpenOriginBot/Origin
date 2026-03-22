from pydantic import BaseModel


class ProjectBase(BaseModel):
    client_id: int
    name: str
    status: str = 'planning'


class ProjectCreate(ProjectBase):
    pass


class ProjectRead(ProjectBase):
    id: int

    model_config = {'from_attributes': True}
