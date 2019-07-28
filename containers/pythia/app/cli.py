#!/usr/bin/env python3

import click as     cli
from    tiki import Tiki
from    time import time

@cli.command()
@cli.option('--device',   default = 'cpu', type = cli.Choice(['cpu', 'cuda', 'mkldnn', 'opengl', 'opencl', 'ideep', 'hip', 'msnpu']))
@cli.option('--image',    default = None)
@cli.option('--question', default = None)
def main(device, image, question):

    tiki = Tiki(device)

    print(f'\nTiki : Command-line Interface\n')

    start      = time()

    question, answer, answers = tiki.getAnswers(image, question)

    end        = time()

    print(f'Tiki : Getting Answers : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'Tiki : RANK | CONFIDENCE | ANSWER')

    for a in answers :

        print(f"       : {a['rank']:<4} | {a['probability']:07.3%}    | {a['answer']}")

if  __name__ == '__main__':
    
    main()