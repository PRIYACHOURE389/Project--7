from flask import Flask, render_template, request
import pickle
import re
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

# Load the trained model
with open('deployed_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the TF-IDF vectorizer
with open('tfidf_vectorizer.pkl', 'rb') as file:
    vectorizer = pickle.load(file)

def preprocess_text(text):
    # Convert text to lowercase
    text = text.lower()
    
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove extra whitespaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        text = request.form['text']

        # Preprocess the text
        processed_text = preprocess_text(text)

        # Vectorize the preprocessed text
        vectorized_text = vectorizer.transform([processed_text])

        # Make prediction
        prediction = model.predict(vectorized_text)[0]

        # Display result
        result = "Disaster" if prediction == 1 else "Not a disaster"
        return render_template('result.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
