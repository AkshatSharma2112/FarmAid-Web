from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import nltk
import string
import random
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Make sure nltk uses correct data path (update if needed)
nltk.data.path.append('/home/akshatsh9125/nltk_data')

# Load chatbot knowledge base
with open(os.path.join(os.path.dirname(__file__), 'chatbot.txt'), 'r', errors='ignore') as f:
    raw_doc = f.read()

raw_doc = raw_doc.lower()

# Sentence and word tokenization
from nltk.tokenize import PunktSentenceTokenizer
tokenizer = PunktSentenceTokenizer()
sent_tokens = tokenizer.tokenize(raw_doc)
word_tokens = nltk.word_tokenize(raw_doc)

lemmer = nltk.stem.WordNetLemmatizer()

# Cleaning and lemmatizing
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# Greeting detection
GREET_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
GREET_RESPONSES = ["hi", "hey", "hello", "All good! What about you?", "Glad you are talking to me"]

def greet(sentence):
    for word in sentence.split():
        if word.lower() in GREET_INPUTS:
            return random.choice(GREET_RESPONSES)
    return None

# Load predefined response corpus
with open(os.path.join(os.path.dirname(__file__), "corpus.json"), "r", encoding="utf-8") as file:
    corpus = json.load(file)

def corpus_response(user_input):
    return corpus.get(user_input.strip())

# TF-IDF based response
def tfidf_response(user_response):
    robo_response = ''
    local_sent_tokens = sent_tokens.copy()
    local_sent_tokens.append(user_response)

    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(local_sent_tokens)

    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]

    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]

    if req_tfidf == 0:
        robo_response = "I am sorry! I don't understand you."
    else:
        robo_response = local_sent_tokens[idx]

    return robo_response

# Overall response logic
def get_bot_response(user_response):
    user_response = user_response.lower().strip()

    if user_response in ['bye', 'exit', 'quit']:
        return "Bye! Take care."

    if user_response in ['thanks', 'thank you']:
        return "You are welcome!"

    greeting = greet(user_response)
    if greeting:
        return greeting

    corpus_reply = corpus_response(user_response)
    if corpus_reply:
        return corpus_reply

    return tfidf_response(user_response)

# Flask app setup
app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    bot_reply = get_bot_response(user_message)
    return jsonify({"reply": bot_reply})

# Start the server
if __name__ == '__main__':
    print("🔌 Starting Flask server on http://localhost:5173 ...")
    app.run(debug=True, port=5000)
