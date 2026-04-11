from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import database as db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db.init_db()


def get_db():
    database = db.SessionLocal()
    try:
        yield database
    finally:
        database.close()


@app.post("/analyze")
def analyze_text(description: str, dbsession: Session = Depends(get_db)):
    mock_tasks = [f"Focus on: {word}" for word in description.split() if len(word) > 6]
    priority = "High" if "urgent" in description.lower() or "dringend" in description.lower() else "Standard"

    new_task = db.TaskModel(
        description=description,
        extracted_tasks=", ".join(mock_tasks[:3]),
        priority=priority
    )
    dbsession.add(new_task)
    dbsession.commit()
    return {"status": "success"}


@app.get("/tasks")
def get_all_tasks(dbsession: Session = Depends(get_db)):
    return dbsession.query(db.TaskModel).all()