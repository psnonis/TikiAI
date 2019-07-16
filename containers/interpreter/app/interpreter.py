#!/usr/bin/env python3

import numpy as np
import os
import time
import speech_recognition as sr
import gc

class Interpreter:

    def __init__(self):

        print(f'Interpreter : Initializing')

        start = time.time()

        self.r = sr.Recognizer()
        self.firstWord = ''
        self.text = ''

        end = time.time()
        print( f'Interpreter : Initializing : Finished in {end-start:7.3f} Seconds\n')

  # Interpretation ------------------------------------------------------------------------------------

    def interpret(self, audio):

        start = time.time()
        
        print(f'Interpreter : Parsing Audio')

        with sr.AudioFile(audio) as source:
            self.audio = self.r.record(source)
        
        self.text = self.r.recognize_google(self.audio)
        self.firstWord = self.text.split()[0]

        end = time.time()

        print(f'Interpreter : Parsing Audio : Finished in {end-start:7.3f} Seconds')

        gc.collect()

        last = time.time()

        return self.text

if  __name__ == '__main__' :

    Interpreter()