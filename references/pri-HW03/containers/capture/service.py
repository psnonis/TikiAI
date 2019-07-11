#!/usr/bin/env python3

import cv2               as cv
import paho.mqtt.client  as mc

from time    import sleep
from os.path import dirname, join, exists
from os      import environ

def capture():

  # load trained classifier for detecting faces
  # https://github.com/opencv/opencv/tree/master/data/haarcascades
    classifier_weights = join(dirname(__file__), 'haarcascade_frontalface_default.xml')
    classifier         = cv.CascadeClassifier(classifier_weights)
    display            = environ.get('DISPLAY', '')

    def detect(frame):

        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

        try    : cv.imshow(f'GRAY', gray)
        except : pass

        return classifier.detectMultiScale(gray, 1.3, 5)

    def publish(frame):

        image = bytearray(cv.imencode('.png',crop_img)[1])        

  # /dev/viddeo0
  # Bus 001 Device 007: ID 046d:0991 Logitech, Inc. QuickCam Pro for Notebooks
    camera = cv.VideoCapture(0)

    client = mc.Client()
    frames = 0

  # edge broker
    client.connect('ebroker', 1883, 60)
    client.loop_start()

    print(f'Starting Capture Loop : DISPLAY = {display}')

    while True:
      # capture frames
        frames    += 1
        ret, frame = camera.read()

        print(f'Captured Frame : {ret} : {frames}')

        if  not ret :
            break

        for (x, y, w, h) in detect(frame) :

            face   = frame[y:y+h, x:x+w]
            image  = cv.imencode('.png', face)[1]
            buffer = bytearray(image)

            cv.imshow('FACE', face)

            print(f'Face Detected! : {typeof(image)}')

            client.publish('capture/alert', buffer)

        cv.waitKey(500)

def main():

    print(f'Starting Service : CAPTURE')

    capture()

if  __name__ == '__main__':

    main()
