"""""""""""""""""""""""""""""""""
Detect faces from USB video camera input in a constant stream. Will publish faces to broker_addr

Calling method: python3 app_faces_video.py <broker_address>

Definition of broker address:
broker_addr = "iot.eclipse.org"
broker_addr = "52.116.3.158"
broker_addr = "localhost"
broker_addr = "127.0.0.1"
broker_addr = "mosquitto"
"""""""""""""""""""""""""""""""""


# Packages import
import numpy as np
import cv2 as cv
import time
import paho.mqtt.client as paho
import sys

# Check script call and broker address
if (len(sys.argv) != 2):
    print("Call using python3 app_faces_videos.py <broker_address>")
    exit()
else:
    broker_addr = sys.argv[1]
    
# Function to check connection to broker in MQTT
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connection to broker: Success!")
    else:
        print("Connection to broker: Failed!")
        
# Connect to client
client = paho.Client()
client.on_connect = on_connect
client.connect(broker_addr, 1883, 60)

# Time to wait next command, avoid blockage
time.sleep(1) 

# Capture from video, using USB camera (not onboarded Jetson one)
cap = cv.VideoCapture(1)

# XML classifier, just for faces, constant, no training
face_cascade = cv.CascadeClassifier('haarcascade_frontalface_default.xml')

# Start stream, using loop
client.loop_start()
#aux = 0
# Run code while camera is on
while(True):
    # Capture frame-by-frame from feed
    ret, frame = cap.read()

    # gray here is the gray frame you will be getting from a camera
    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    # Display image, faces, and publish message
    img = cv.imshow('frame', gray)
    for (x,y,w,h) in faces:
        crop_faces = gray[y:y+h,x:x+w]
        cv.imshow("crop", crop_faces)
        client.publish("face_app/test", bytearray(cv.imencode('.png', crop_faces)[1]), qos=1)

    # Close the connection
    if cv.waitKey(1) & 0xFF == ord('q'):
        break
    
    #aux = aux + 1

# Time to wait next command, avoid blockage
time.sleep(1) 
        
# When everything is done, release the capture, stop the loop and disconnect from client
client.loop_stop()
client.disconnect()
cap.release()
cv.destroyAllWindows()