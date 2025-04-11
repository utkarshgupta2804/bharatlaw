# chatbot.py
import requests
from flask import Flask, request, render_template
from flask import jsonify
from flask_cors import CORS  # Add this import
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for now 


# Hugging Face Inference API setup
API_URL = "https://api-inference.huggingface.co/models/harsh580g/qwen-0.5B-fine-tuned-on-legal-data"
HF_API_TOKEN = os.getenv("HF_API_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_API_TOKEN}",
    "Content-Type": "application/json"
}

# Define response generation function using API with explicit task
def generate_response(query):
    input_text = f"### Query:\n{query}\n\n### Response:\n"
    payload = {
        "inputs": input_text,
        "parameters": {
            "max_length": 128,
            "temperature": 0.7,
            "top_p": 0.9,
            "do_sample": True,
            "return_full_text": False  # Only return generated text after prompt
        },
        "options": {
            "task": "text-generation"  # Explicitly specify the task
        }
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        result = response.json()[0]["generated_text"]
        return result.strip()
    else:
        return f"Error: {response.status_code} - {response.text}"

@app.route('/predict', methods=['POST'])
def predict():
    user_input = request.json.get('prompt', '').strip()

    if not user_input:
        return jsonify({'error': 'No input provided'}), 400

    response = generate_response(user_input)
    return jsonify({'query': user_input, 'response': response})

if __name__ == '__main__':

    app.run(debug=True, host='0.0.0.0', port=5000)