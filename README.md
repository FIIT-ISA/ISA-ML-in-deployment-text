# ISA course: ML/DL deployment - Text data type

Example of text classification inference. You can send your messaged either by clicking on the "Send" button or pressing "Enter". 

Author(s):
- Matej Volansky (2024)
- as a part of the Team project for the course preparation in 2023/2024

Docker image size: `578 MB` ( build takes quite some time )

File the model was trained from: [IAU_072_sentiment_analysis_in_text.ipynb](https://github.com/FIIT-IAU/IAU-course/blob/main/exercises/week-09/IAU_02_sentiment_analysis_in_text.ipynb)

## Setup
First train your model and save the `.pkl` state dictionary after training (considering you're using NLTK + Pickle). 

## Run
To use this inference, just run 

```
docker compose up
```
After successful build, your server will be available at `http://localhost:8080/` 


For manual running without docker you have to create a python virtual environment.

```
python -m venv venv

source venv/bin/activate          # on Linux based distros
source venv\Scripts\activate.ps1  # on Windows (Powershell)
source venv\Scripts\activate.bat  # on Windows (cmd)
```

Install the required libraries via this command
```
pip install -r requirements.txt
```

Install these nltk packages via python
```
import nltk
nltk.download('stopwords')
nltk.download('punkt') 
nltk.download('averaged_perceptron_tagger') 
nltk.download('wordnet')
```
you must not move the `nltk\data` directories afterwards.
