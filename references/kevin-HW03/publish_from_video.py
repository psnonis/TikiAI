# Detect faces in usb video camera input.  Publish faces to <broker_address>
#
# Usage: python3 publish_from_video.py <broker_address>

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

if (len(sys.argv) != 2):
    print("Usage: python3 publish_from_video.py <broker_address>")
    exit()
else:
    broker_address = sys.argv[1]

cap = cv2.VideoCapture(0)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
    else:
        print("Connection failed")
 
client = mqtt.Client()
client.on_connect = on_connect
client.connect(broker_address,1883,60)
time.sleep(1)    

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

client.loop_start()

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Display the resulting frame
    cv2.imshow('frame',gray)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x,y,w,h) in faces:
        crop_img = gray[y:y+h, x:x+w]
        cv2.imshow("cropped", crop_img)
        client.publish("face_crop/test",bytearray(cv2.imencode('.png',crop_img)[1]),qos=1)

    if cv2.waitKey(500) & 0xFF == ord('q'):
        break

    time.sleep(1)

# When everything done, release the capture and disconnect
client.loop_stop()
client.disconnect()
cap.release()
cv2.destroyAllWindows()
