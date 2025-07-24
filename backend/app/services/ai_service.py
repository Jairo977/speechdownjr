# Servicio de IA
import os
import requests

# --- Gemini: Generación de ejercicios ---
def generate_gemini_exercise(prompt):
    api_key = os.getenv('GEMINI_API_KEY', '')
    if not api_key or api_key.startswith('AIzaSyxxxx'):
        return {'exercise': f"[Simulado Gemini] Ejercicio generado para el prompt: {prompt}"}
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + api_key
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    try:
        response = requests.post(url, headers=headers, json=data, timeout=15)
        response.raise_for_status()
        result = response.json()
        exercise = result["candidates"][0]["content"]["parts"][0]["text"]
        return {"exercise": exercise}
    except Exception as e:
        return {"error": str(e)}

# --- Gemini: Síntesis de texto a voz (simulado) ---

import base64
import soundfile as sf
from transformers import pipeline

# Inicializar el pipeline de Bark una sola vez
tts_pipeline = pipeline("text-to-speech", model="suno/bark-small")


def gemini_text_to_speech(text):
    try:
        import numpy as np
        output = tts_pipeline(text)
        audio = output["audio"]
        # Convertir a float32 y a 1D (mono) si es necesario
        import numpy as np
        if not isinstance(audio, np.ndarray):
            audio = np.array(audio)
        if audio.dtype != np.float32:
            audio = audio.astype(np.float32)
        # Si es multicanal, convertir a mono
        if len(audio.shape) > 1:
            audio = audio.mean(axis=1)
        # Guardar el audio en un buffer temporal
        import io
        buffer = io.BytesIO()
        sf.write(buffer, audio, output["sampling_rate"], format='WAV')
        buffer.seek(0)
        audio_base64 = base64.b64encode(buffer.read()).decode('utf-8')
        return {"audio_base64": audio_base64}
    except Exception as e:
        return {"audio_base64": None, "error": str(e)}

def generate_speech_exercise(prompt):
    api_key = os.getenv('OPENROUTER_API_KEY', '')
    if not api_key or api_key.startswith('sk-xxxxxx'):
        # Simulación local
        return {
            'exercise': f"[Simulado] Ejercicio generado para el prompt: {prompt}"
        }
    # Llamada real a OpenRouter
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://speechdown.app",
        "X-Title": "SpeechDownApp"
    }
    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Eres un generador de ejercicios terapéuticos para niños con Síndrome de Down en Latinoamérica."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 400,
        "temperature": 0.7
    }
    try:
        response = requests.post(url, headers=headers, json=data, timeout=15)
        response.raise_for_status()
        result = response.json()
        exercise = result["choices"][0]["message"]["content"]
        return {"exercise": exercise}
    except Exception as e:
        return {"error": str(e)}
