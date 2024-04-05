#!/bin/bash

cd /home/ubuntu/app/papplan

# 터미널 로그 확인
# set -x

sudo ln -s /home/ubuntu/.nvm/versions/node/v20.11.0/bin/npm /usr/bin/npm

# vue 프로젝트 빌드
/usr/bin/npm install
/usr/bin/npm run build

# 생성된 빌드 파일의 소유자 변경
# sudo chown -R ubuntu:ubuntu dist

# public 디렉토리의 권한 변경
# sudo chmod -R +w public

# ./gradlew bootJar

# sudo docker compose -f docker-compose.yml up -d --build --force-recreate
