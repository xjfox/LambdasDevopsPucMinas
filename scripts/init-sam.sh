#/bin/bash

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localstack:4566/health)" != "200" ]]; do
    echo "Aguardando o localstack ficar pronto..."
    sleep 5
done

sleep 10

sam local start-lambda --docker-network shared-services --host 0.0.0.0 --warm-containers EAGER --debug
