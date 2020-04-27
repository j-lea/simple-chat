#!/bin/bash

# Start the server
cd chatServer
mvn spring-boot:run &

# Start the client
cd ../chat-client
yarn start &
