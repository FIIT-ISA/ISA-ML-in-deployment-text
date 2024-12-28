from flask import Flask, request, jsonify
import pickle
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tag import pos_tag
import re, string

app = Flask(__name__)

# Load the trained classifier
with open('./model/sentiment_classifier.pkl', 'rb') as f:
    classifier = pickle.load(f)

stop_words = stopwords.words('english')

def remove_noise(tweet_tokens, stop_words = ()):
    cleaned_tokens = []
    for token, tag in pos_tag(tweet_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+','', token)
        token = re.sub("(@[A-Za-z0-9_]+)","", token)
        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'
        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)
        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    tweet = data['tweet']
    custom_tokens = remove_noise(word_tokenize(tweet), stop_words)
    sentiment = classifier.classify(dict([token, True] for token in custom_tokens))
    return jsonify({'sentiment': sentiment})


if __name__ == '__main__':
    # Production
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
    # Development
    #app.run(host='0.0.0.0', port=8080)
