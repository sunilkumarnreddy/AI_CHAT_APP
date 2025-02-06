from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai  # or the language model you're using

app = FastAPI()


# Allow CORS from localhost:3000 (React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows the React app
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/api/generate")
async def generate_response(request: PromptRequest):
    prompt = request.prompt
    # Call to the AI model (OpenAI, Hugging Face, etc.)
    response = {"generated_text": "This is a generated response for: " + prompt}
    return response
