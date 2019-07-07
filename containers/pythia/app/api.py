#!/usr/bin/python3

import click as     cli
from  oracle import Oracle
from    time import time

from flask         import Flask, Response, request
#from flask_restful import Resource, Api

app = Flask(__name__)
#api = Api(app)

def orc():

    if  not orc.oracle:
        orc.device = app.config['device']
        orc.oracle = Oracle(orc.device)

    return orc.oracle

orc.device = None
orc.oracle = None

@app.route('/api/divine', methods = ['POST'])
def api_divine():

    print('api_divine')

    return 'Please Wait'

@app.before_first_request
def initialize():

    print('before_first_request')

@app.route('/')
def index():
    return 'Pythia Flask Server Up and Running!'

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