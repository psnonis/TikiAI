# Subscribe to <broker_address>. Grab images, store in IBM Cloud Storage that is mounted at <output_directory>
#
# Usage: python3 subscribe_to_image.py <broker_address> <output_directory>

# Example broker addresses
# broker_address= "iot.eclipse.org"
# broker_address="52.116.3.158"
# broker_address="localhost"
# broker_address="127.0.0.1"
# broker_address="mosquitto"

# Example output directory
# output_directory="/mnt/hw3-images"

import cv2
import paho.mqtt.client as mqtt
import time
import numpy as np
import sys

if (len(sys.argv) != 3):
    print("Usage: python3 subscribe_to_image.py <broker_address> <output_directory")
    exit()
else:
    broker_address = sys.argv[1]
    output_directory = sys.argv[2]

def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))
  client.subscribe("face_crop/test")

image_number = 0 

def on_message(client,userdata, msg):
    global image_number
    print("message received!")
    f = np.frombuffer(msg.payload, dtype='uint8')
    img = cv2.imdecode(f, flags=1)
    print(img.shape)

    img_name = output_directory + "/face-" + str(image_number) + ".png"
    print(img_name)
    image_number = image_number + 1

    cv2.imwrite(img_name, img)

client = mqtt.Client()
client.connect(broker_address,1883,60)

client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()
