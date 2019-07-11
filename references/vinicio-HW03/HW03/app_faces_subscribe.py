"""""""""""""""""""""""""""""""""
Subscribe to <broker_address>, grab the image and store it in IBM Cloud Storage mounted at <output_directory>

Calling method: python3 app_faces_subscribe.py <broker_address> <output _directory>

Definition of broker address:
broker_addr = "iot.eclipse.org"
broker_addr = "52.116.3.158"
broker_addr = "localhost"
broker_addr = "127.0.0.1"
broker_addr = "mosquitto"

Definition of output directory
output_dir = "/mnt/face-images" 
"""""""""""""""""""""""""""""""""

# Packages import
import numpy as np
import cv2 as cv
import time
import paho.mqtt.client as paho
import sys

# Check script call and broker address
if (len(sys.argv) != 3):
    print("Call using python3 app_faces_videos.py <broker_address> <output_directory>")
    exit()
else:
    broker_addr = sys.argv[1]
    output_dir = sys.argv[2]
    
# Create methods for connections and subscription of messages
def on_connect(client, userdata, flags, rc):
    print("Connected to broker with result code "+str(rc))
    client.subscribe("face_app/test")

# Start counter
img_number = 0

def on_message(client, userdata, msg):
    # Aknowledge reception of image
    global img_number
    print("Image captured!")
    
    # De-encode message
    f = np.frombuffer(msg.payload, dtype='uint8')
    img = cv.imdecode(f, flags=1)
    print(img.shape)
    
    # Save messages, keeping numeration of stream
    if(img_number <10):
        img_name = output_dir + "/face-0" + str(img_number) + ".png"
        print(img_name)
    else:
        img_name = output_dir + "/face-" + str(img_number) + ".png"
        print(img_name)
    img_number = img_number + 1
    
    # Write image in Object Storage
    cv.imwrite(img_name, img)
    
# Connect to MQTT client
client= paho.Client()
client.connect(broker_addr, 1883, 60)
client.on_connect = on_connect
client.on_message = on_message

# Keep this open until streams ends
client.loop_forever()