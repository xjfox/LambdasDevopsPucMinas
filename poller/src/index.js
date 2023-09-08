const LOCALSTACK_ENDPOINT = process.env.LOCALSTACK_ENDPOINT || 'http://localstack:4566'
const LAMBDA_FUNCTION_NAME = process.env.LAMBDA_FUNCTION_NAME;
const SNS_TOPIC_NAME = process.env.SNS_TOPIC_NAME;
const SQS_QUEUE_NAME = process.env.SQS_QUEUE_NAME;
const SQS_QUEUE_URL = `${LOCALSTACK_ENDPOINT}/000000000000/${SQS_QUEUE_NAME}`;

const handlers = require('./handlers');

async function main() {
  const snsTopicArn = await handlers.ensureTopicSnsExists({ snsTopicName: SNS_TOPIC_NAME });
  await handlers.ensureQueueExistsAndSubscribe
  await handlers.ensureQueueExistsAndSubscribe({
    sqsQueueName: SQS_QUEUE_NAME,
    snsTopicArn
  });

  console.log(`Polling queue ${SQS_QUEUE_NAME} into lambda ${LAMBDA_FUNCTION_NAME}`);

  await handlers.pollQueue({
    sqsQueueUrl: SQS_QUEUE_URL,
    lambdaFunctionName: LAMBDA_FUNCTION_NAME
  });
}

main();

