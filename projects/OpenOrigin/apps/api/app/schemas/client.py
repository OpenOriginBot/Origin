from pydantic import BaseModel


class ClientBase(BaseModel):
    name: str
    status: str = 'active'


class ClientCreate(ClientBase):
    pass


class ClientRead(ClientBase):
    id: int

    model_config = {'from_attributes': True}
