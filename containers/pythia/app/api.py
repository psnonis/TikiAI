#!/usr/bin/env python3

import click as     cli
from  oracle import Oracle
from    time import time

from PIL import Image
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

def orc(app):

    if  not orc.oracle:
        orc.device = app.config['device']
        orc.oracle = Oracle(orc.device)

    return orc.oracle

orc.device = None
orc.oracle = None

app = Flask(__name__)

@app.route('/api/divine', methods = ['POST'])
def api_divine():

    print(f'{EOL}{SKY}{TXT}  HANDLER > api_divine [{time()}] {PAD}{RST}')
    request.get_data()

    question = request.args.get('question')
    data     = request.data

  # image    = BytesIO(data) # postman, binary

    if  question :
        
        response = {}

        for n, name in enumerate(request.files, 1) :

            response[name] = {}

            image = request.files[name]
            image = Image.open(image)
            meta  = f'{image.format}, {image.size}, {image.mode}'

            print(f'{PUR}{TXT} QUESTION > {question} {PAD}')
            print(f'{PUR}{TXT}    IMAGE > {meta    } {PAD}{RST}{EOL}')

            response[name]['probabilities'], \
            response[name]['answers'      ]  = orc().divine(image, question, meta)

        return response

    else :

        print(f'{RED}{TXT}   STATUS > Invalid Request {PAD}{RST}{EOL}')

        return { 'error' : 'Invalid Request' }

@app.route('/')
def index():

    print(f'{EOL}{SKY}{TXT} index {PAD}{RST}{EOL}')

    return f'Pythia Flask Server Up and Running! : {time()}'

@app.route('/africa')
def africa():

    start          = time()
    probs, answers = orc().divine('africa.jpg', 'where is this place ?')
    end            = time()

    print(f'Oracle : Divining Answers : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'Oracle : RANK | CONFIDENCE | ANSWER')

    for n, (p, a) in enumerate(zip(probs, answers), 1):

        print(f'       : {n:<4} | {p:07.3%}    | {a}')

    return f'{answers}'

@cli.command()
@cli.option('--device',   default = 'cpu', type = cli.Choice(['cpu', 'cuda', 'mkldnn', 'opengl', 'opencl', 'ideep', 'hip', 'msnpu']))
def main(device):

    print(f'\nOracle : RESTful Application Programming Interface\n')

    app.config['device'] = device

    orc(app)

    app.run(host = '0.0.0.0', debug = False)

if  __name__ == '__main__':

    main()