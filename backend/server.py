from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import string
import random
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import nltk
from nltk.tokenize import PunktSentenceTokenizer, word_tokenize
from nltk.stem import WordNetLemmatizer

# Ensure NLTK resources
required_resources = {
    "punkt": "tokenizers/punkt",
    "wordnet": "corpora/wordnet"
}

for resource, path in required_resources.items():
    try:
        nltk.data.find(path)
    except LookupError:
        nltk.download(resource)

# Load knowledge base
with open(os.path.join(os.path.dirname(__file__), 'chatbot.txt'), 'r', errors='ignore') as f:
    raw_doc = f.read()

raw_doc = raw_doc.lower()
sent_tokenizer = PunktSentenceTokenizer()
sent_tokens = sent_tokenizer.tokenize(raw_doc)

lemmer = WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(word_tokenize(text.lower().translate(remove_punct_dict)))

GREET_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
GREET_RESPONSES = ["hi", "hey", "hello", "All good! What about you?", "Glad you are talking to me"]

def greet(sentence):
    for word in sentence.split():
        if word.lower() in GREET_INPUTS:
            return random.choice(GREET_RESPONSES)
    return None

with open(os.path.join(os.path.dirname(__file__), "corpus.json"), "r", encoding="utf-8") as file:
    corpus = json.load(file)

def corpus_response(user_input):
    return corpus.get(user_input.strip())

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

app = Flask(__name__)
CORS(app, origins=["https://farm-aid-web.vercel.app"])

# Health check route (optional)
@app.route('/', methods=['GET'])
def index():
    return jsonify({"status": "Backend is running"})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    bot_reply = get_bot_response(user_message)
    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
