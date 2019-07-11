  FROM alpine

  WORKDIR /

  RUN apk update
  RUN apk add mosquitto
  RUN apk add mosquitto-clients

  VOLUME ["/mosquitto/data", "/mosquitto/log"]

# COPY mosquitto.conf /

# CMD ["/usr/sbin/mosquitto", "-c", "/mosquitto.conf"]
