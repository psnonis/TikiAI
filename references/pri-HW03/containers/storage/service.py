#!/usr/bin/env python3

class S3 :

    import ibm_boto3               as s3
    from   ibm_botocore.client import Config, ClientError

    COS_ENDPOINT      = 'https://s3.us.cloud-object-storage.appdomain.cloud'
    COS_API_KEY_ID    = 'lruH9zeBXQzK72eEsCJ0t065HDwWhw9U_Mn0kvB1Xn7P'
    COS_AUTH_ENDPOINT = 'https://iam.cloud.ibm.com/identity/token'
    COS_RESOURCE_CRN  = 'crn:v1:bluemix:public:cloud-object-storage:global:a/46a8e0d2454e4a48b927bb25e4965f3f:00f46e1d-5704-4e33-b33f-cc69247f2f67:bucket:w251-homework-03'

  # create resource
    COS = s3.resource('s3',
            ibm_api_key_id          = COS_API_KEY_ID,
            ibm_service_instance_id = COS_RESOURCE_CRN,
            ibm_auth_endpoint       = COS_AUTH_ENDPOINT,
            config                  = Config(signature_version = 'oauth'),
            endpoint_url            = COS_ENDPOINT)

    def UploadFile(bucket_name, item_name, file_path):

        print(f'S3 Uploading File : {item_name} to {bucket_name}')

        try:
            with open(file_path, 'rb') as file_obj:
                S3.COS.Object(bucket_name, item_name).upload_fileobj(Fileobj = file_obj)
                print(f'S3 Uploading File : SUCCESS')
        except Exception as e:
            print(f'S3 Uploading File : FAILURE : {e}')

    def UploadText(bucket_name, item_name, file_text):

        print(f'S3 Uploading Text : {item_name} to {bucket_name}')

        try:
            S3.COS.Object(bucket_name, item_name).put(Body = file_text)
            print(f'S3 Uploading Text : SUCCESS')
        except Exception as e:
            print(f'S3 Uploading Text : FAILURE : {e}')

    def ListContents(bucket_name):

        print(f'S3 Listing Bucket Contents : {bucket_name}')

        try:
            for file in S3.COS.Bucket(bucket_name).objects.all():
                print(f'S3 Listing Bucket Contents : {bucket_name} : {file.key} : {file.size} B')
        except Exception as e:
            print(f'S3 Listing Bucket Contents : FAILURE : {e}')

import cv2               as cv
import paho.mqtt.client  as mc
import numpy             as np

BUCKET = 'w251-homework-03'
alerts = 0

def connect_handler(client, userdata, flags, rc):
    
    print(f'connect : {flags} : {rc}')

    client.subscribe('capture/alert')

def message_handler(client, userdata, msg):

    global alerts

    print(f'message : {alerts}')

    buffer  = msg.payload
    image   = np.frombuffer(buffer, dtype = np.uint8)
    face    = cv.imdecode(image, flags = 1)
    name    = f'{alerts:05}.png'
    path    = f'/tmp/{name}'
    alerts += 1

    cv.imwrite(path, face)

    print(f'message : {path} : {face.shape}')

    S3.UploadFile(BUCKET, name, path)

def storage():

    global alerts

    client = mc.Client()

    S3.UploadText(BUCKET, 'test.txt', 'hello wonderful world')

  # cloud broker
    client.connect('cbroker', 1883, 60)

    client.on_connect = connect_handler
    client.on_message = message_handler

    client.loop_forever()

def main():

    print(f'Starting Service : STORAGE')

    storage()

if  __name__ == '__main__':

    main()