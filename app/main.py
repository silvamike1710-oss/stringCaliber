from fastapi import FastAPI
from pydantic import BaseModel
from calculations import calculate_tension
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base = declarative_base()


@app.get("/")
def home():
    return {"message": "String Tension API"}


class TensionRequest(BaseModel):
    unit_weight: float
    scale_length: float
    frequency: float


@app.post("/calculate")
def calculate(data: TensionRequest):

    tension = calculate_tension(
        data.unit_weight,
        data.scale_length,
        data.frequency
    )

    return {
        "tension": tension
    }


class GuitarString(Base):
    __tablename__ = "strings"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String)
    gauge = Column(String)
    unit_weight = Column(Float)

