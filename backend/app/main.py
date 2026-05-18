from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.calculations import calculate_tension

app = FastAPI()

# CORS MUST come immediately after app creation
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # temporary for debugging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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