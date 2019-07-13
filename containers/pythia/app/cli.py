#!/usr/bin/env python3

import click as     cli
from  oracle import Oracle
from    time import time

@cli.command()
@cli.option('--device',   default = 'cpu', type = cli.Choice(['cpu', 'cuda', 'mkldnn', 'opengl', 'opencl', 'ideep', 'hip', 'msnpu']))
@cli.option('--image',    default = None)
@cli.option('--question', default = None)
def main(device, image, question):

    orc = Oracle(device)

    print(f'\nOracle : Command-line Interface\n')

    start    = time()
    probs,   \
    answers, \
    delays   = orc.divine(image, question)
    end      = time()

    print(f'Oracle : Divining Answers : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'Oracle : RANK | CONFIDENCE | ANSWER')

    for n, (p, a) in enumerate(zip(probs, answers), 1):

        print(f'       : {n:<4} | {p:07.3%}    | {a}')

if  __name__ == '__main__':
    
    main()