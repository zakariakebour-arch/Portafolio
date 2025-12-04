from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

OPENROUTER_API_KEY = "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"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    messages = data.get("messages", [])

    respuesta = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://zakariakebour-arch.github.io/Portafolio/",
            "X-Title": "Chat de Zakaria"
        },
        json={
            "model": "deepseek/deepseek-chat:free",
            "messages": messages
        }
    )

    return jsonify(respuesta.json())


@app.route("/", methods=["GET"])
def home():
    return "Servidor Flask funcionando"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
