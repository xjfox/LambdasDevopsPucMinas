FROM node:16-alpine AS dev

RUN apk update && apk add --no-cache build-base python3 py3-pip python3-dev bash git curl docker

RUN pip install --upgrade pip

RUN pip install --no-cache-dir awscli aws-sam-cli

RUN rm -rf /var/cache/apk/*

RUN aws configure set aws_access_key_id test \
    && aws configure set aws_secret_access_key test \
    && aws configure set default.region us-east-1

WORKDIR /application
