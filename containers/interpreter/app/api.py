#!/usr/bin/env python3

import click as     cli
from  interpreter import Interpreter
from    time import time

from io  import BytesIO

from flask import Flask, Response, jsonify, request

PAD='\x1B[K'
SKY='\x1B[48;5;39m'
GRN='\x1B[48;5;42m'
PUR='\x1B[48;5;161m'
RED='\x1B[48;5;196m'

TXT='\x1B[38;5;190m'
RST='\x1B[0m'
EOL='\n'

def vqahelper(app):

    if  not vqahelper.interpreter:
        vqahelper.interpreter = Interpreter()

    return vqahelper.interpreter

vqahelper.interpreter = None

app = Flask(__name__)

@app.route('/api/interpret', methods = ['POST'])
def api_interpret():

    print(f'{EOL}{SKY}{TXT}  HANDLER > api_interpret [{time()}] {PAD}{RST}')
    request.get_data()

    data     = request.data

    try:
        
        response = {}

        for n, name in enumerate(request.files, 1) :

            response[name] = {}

            audio = request.files[name]

            response[name]['interpretation'] = vqahelper(app).interpret(audio)

        return response

    except:
        print(f'{RED}{TXT}   STATUS > Invalid Request {PAD}{RST}{EOL}')

        return { 'error' : 'Invalid Request' }

@app.route('/')
def index():

    print(f'{EOL}{SKY}{TXT} index {PAD}{RST}{EOL}')

    return f'Interpreter Flask Server Up and Running! : {time()}'

@app.route('/sample_audio')
def sample_audio():

    start          = time()
    interpretation = vqahelper(app).interpret('sample_audio.wav')
    end            = time()

    print(f'Interpreter : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'Interpreter : Interpretation')

    print(f'            : {interpretation}')

    return f'{interpretation}'

@cli.command()
def main():

    print(f'\Interpreter : RESTful Application Programming Interface\n')

    vqahelper(app)

    app.run(host = '0.0.0.0', debug = False)

if  __name__ == '__main__':

    main()