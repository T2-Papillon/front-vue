#!/usr/bin/env bash

cd /home/ubuntu/app/papplan

# vue 프로젝트 빌드
npm run build

# ./gradlew bootJar

sudo docker compose -f docker-compose.yml up -d --build --force-recreate
