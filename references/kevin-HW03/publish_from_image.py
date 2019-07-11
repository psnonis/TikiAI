# Detect faces in <image_filename>.  Publish faces to <broker_address>
#
# Usage: python3 publish_from_image.py <image_filename> <broker_address>

# Example broker addresses
# broker_address= "iot.eclipse.org"
# broker_address="52.116.3.158"
# broker_address="localhost"
# broker_address="127.0.0.1"
# broker_address="mosquitto"

import cv2
import paho.mqtt.client as mqtt
import time
import numpy as np
import sys

if (len(sys.argv) != 3):
    print("Usage: python3 publish_from_image.py <image_filename> <broker_address>")
    exit()
else:
    image_filename = sys.argv[1]
    broker_address = sys.argv[2]
 
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
    else:
        print("Connection failed")
 
client = mqtt.Client()
client.on_connect= on_connect

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# img = cv2.imread(image_filename)
img = cv2.imread(image_filename)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.3, 5)

client.connect(broker_address,1883,60)
time.sleep(1)    
client.loop_start()

for (x,y,w,h) in faces:
    crop_img = img[y:y+h, x:x+w]
    client.publish("face_crop/test",bytearray(cv2.imencode('.png',crop_img)[1]))
    time.sleep(1)    

client.loop_stop()
client.disconnect()
