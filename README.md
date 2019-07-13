# w251-final
<b>Quick Start Guide</b>

```
docker run -d -t -p 5000:5000 --rm --name pythia psnonis/w251-final:pythia
curl -X POST -F "image=@africa.jpg" localhost:5000/api/divine?question='where%20is%20this%20place%20%3F'
  ```
