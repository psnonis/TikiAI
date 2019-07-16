# Build Docker Container  
docker build -f ./Dockerfile . -t interpreter --no-cache

# Run Docker Container mapping port 5001 to 5000
docker run --name interpreter --rm -d -t -p 5001:5000 interpreter

# Test Docker Container
curl -X POST -F "audio=@sample_audio.wav" localhost:5001/api/interpret