.PHONY: build up down start stop restart logs ps login

build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

restart:
	down up

logs:
	docker-compose logs --tail=10 -f

ps:
	docker-compose ps

login-sam:
	docker-compose run -w /application sam /bin/bash

login-poller-cadastro-crm:
	docker-compose run -w /application poller-novo-cliente-cadastro-crm /bin/bash
