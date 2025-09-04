"""
Simple Flask mock server for testing the Angular Chatbot
Run this with: python mock_chatbot_server.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok"})

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat endpoint that provides mock responses"""
    data = request.get_json()
    user_message = data.get('message', '')
    
    # Simulate processing time
    time.sleep(random.uniform(0.5, 2.0))
    
    # Simple mock responses based on keywords
    responses = {
        'angular': "Angular is a powerful TypeScript-based framework for building web applications. It offers features like components, services, dependency injection, and much more!",
        'component': "Angular components are the building blocks of an Angular application. They control patches of screen called views through an associated template.",
        'service': "Angular services are singleton objects that provide specific functionality across your application. They're great for sharing data and logic between components.",
        'routing': "Angular Router enables navigation from one view to the next as users perform application tasks. It interprets a browser URL as an instruction to navigate to a client-generated view.",
        'signals': "Angular Signals are a new reactive primitive that provides a simple and efficient way to manage state in Angular applications.",
        'standalone': "Standalone components in Angular don't need to be declared in an NgModule. They can import dependencies directly, making them more self-contained.",
        'hello': "Hello! I'm your Angular assistant. Ask me anything about Angular development!",
        'help': "I can help you with Angular concepts like components, services, routing, signals, forms, HTTP client, and much more. What would you like to know?",
        'default': "That's an interesting question! I'm here to help with Angular development. Could you be more specific about what you'd like to know?"
    }
    
    # Find the best response based on keywords
    user_message_lower = user_message.lower()
    response_text = responses['default']
    
    for keyword, response in responses.items():
        if keyword in user_message_lower:
            response_text = response
            break
    
    return jsonify({"response": response_text})

if __name__ == '__main__':
    print("Starting Mock Chatbot Server...")
    print("Health endpoint: http://127.0.0.1:5000/api/health")
    print("Chat endpoint: http://127.0.0.1:5000/api/chat")
    app.run(debug=True, host='127.0.0.1', port=5000)
