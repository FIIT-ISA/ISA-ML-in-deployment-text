# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Create the sources.list file, use a different mirror, and add retry logic
RUN echo "deb http://ftp.us.debian.org/debian bookworm main" > /etc/apt/sources.list \
    && echo "deb http://ftp.us.debian.org/debian bookworm-updates main" >> /etc/apt/sources.list \
    && echo "deb http://security.debian.org/ bookworm-security main" >> /etc/apt/sources.list \
    && apt-get update -y --fix-missing \
    && apt-get install -y \
        gcc \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Download NLTK data
RUN python -m nltk.downloader stopwords punkt averaged_perceptron_tagger wordnet

# Make port 5000 available to the world outside this container
EXPOSE 8080

# Run app.py when the container launches
CMD ["python", "app.py"]
