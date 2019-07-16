#!/usr/bin/env python3

import click as     cli
from  interpreter import Interpreter
from    time import time

@cli.command()
@cli.option('--audio', default = None)
def main(audio):

    vqahelper = Interpreter()

    print(f'\nInterpreter : Command-line Interface\n')

    start    = time()
    interpretation = vqahelper.interpret(audio)
    end      = time()

    print(f'Interpreter : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'Interpreter : Interpretation')

    print(f'            : {interpretation}')

if  __name__ == '__main__':
    
    main()