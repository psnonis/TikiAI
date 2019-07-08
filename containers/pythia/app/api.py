#!/usr/bin/python3

import click as     cli
from  oracle import Oracle
from    time import time

from PIL import Image
from io  import BytesIO

from flask         import Flask, Response, jsonify, request

#from flask_restful import Resource, Api

app = Flask(__name__)
#api = Api(app)

PAD='\x1B[K'
SKY='\x1B[48;5;39m'
GRN='\x1B[48;5;42m'
PUR='\x1B[48;5;161m'
RED='\x1B[48;5;196m'

TXT='\x1B[38;5;190m'
RST='\x1B[0m'
EOL='\n'

def orc():

    if  not orc.oracle:
        orc.device = app.config['device']
        orc.oracle = Oracle(orc.device)

    return orc.oracle

orc.device = None
orc.oracle = None

@app.route('/api/divine', methods = ['POST'])
def api_divine():

    print(f'{EOL}{SKY}{TXT}  HANDLER > api_divine {PAD}{RST}')
    request.get_data()

    question = request.args.get('question')
    data     = request.data

    if  question and data :

        image = Image.open(BytesIO(data))
        meta  = f'{image.format}, {image.size}, {image.mode}'

        print(f'{PUR}{TXT} QUESTION > {question} {PAD}')
        print(f'{PUR}{TXT}    IMAGE > {meta    } {PAD}{RST}{EOL}')

        probs, answers = orc().divine(image, question, meta)

        return f'{answers}'

    else :
        print(f'{RED}{TXT}   STATUS > Invalid Request {PAD}{RST}{EOL}')
        return 'Invalid Request'

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

    app.run(host = '0.0.0.0', debug = True)

if  __name__ == '__main__':

    main()