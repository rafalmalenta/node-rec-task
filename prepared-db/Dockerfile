FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD haslo
ENV MYSQL_DATABASE movies
ENV MYSQL_USER rafi
ENV MYSQL_PASSWORD test

COPY script.sql /docker-entrypoint-initdb.d/
EXPOSE 3306