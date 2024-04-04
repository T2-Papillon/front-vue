#!/usr/bin/env bash

cd /home/ubuntu/app/papplan

# 터미널 로그 확인
set -x

# vue 프로젝트 빌드
npm install
npm run build

# 생성된 빌드 파일의 소유자 변경
sudo chown -R ubuntu:ubuntu dist
sudo chmod -R o+w  public

# ./gradlew bootJar

sudo docker compose -f docker-compose.yml up -d --build --force-recreate
