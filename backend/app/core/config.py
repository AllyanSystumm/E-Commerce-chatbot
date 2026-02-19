import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AION AI Chatbot"
    DATABASE_URL: str # Required in .env
    GROQ_API_KEY: str # Required in .env
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
