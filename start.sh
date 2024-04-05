#!/usr/bin/env bash

cd /home/ubuntu/app/papplan

# 터미널 로그 확인
# set -x

#sudo ln -s /root/.nvm/versions/node/v16.15.1/bin/yarn /usr/bin/yarn# 

# vue 프로젝트 빌드
/home/ubuntu/.nvm/versions/node/v20.11.0/bin/npm install
/home/ubuntu/.nvm/versions/node/v20.11.0/bin/npm run build

# 생성된 빌드 파일의 소유자 변경
# sudo chown -R ubuntu:ubuntu dist

# public 디렉토리의 권한 변경
# sudo chmod -R +w public

sudo docker compose -f docker-compose.yml up -d --build --force-recreate
