# Interpreter Flask Server Docker File

    FROM jwilder/nginx-proxy

    # Setup Working Directory
    RUN apt-get update
    RUN apt-get install -y vim
    
    #Modify Config
    RUN apt install --reinstall sed
    RUN sed -i '62iserver {listen 80 ; server_name tiki.systems; return 301 $scheme://www.tiki.systems;}' /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

# Entry Point
  ENTRYPOINT ["/app/docker-entrypoint.sh"]
  CMD ["forego", "start", "-r"]

  