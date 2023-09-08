const { lambda, sqs } = require('../services');

module.exports = async function pollQueue(options) {
  const { sqsQueueUrl, lambdaFunctionName } = options;

  const params = {
    QueueUrl: sqsQueueUrl,
    MaxNumberOfMessages: 1,
  };

  const data = await sqs.receiveMessage(params).promise();

  if (data.Messages) {
    const message = data.Messages[0];
    const payload = message.Body;

    await lambda.invoke({
      FunctionName: lambdaFunctionName,
      Payload: JSON.stringify(payload),
    }).promise();

    await sqs.deleteMessage({
      QueueUrl: sqsQueueUrl,
      ReceiptHandle: message.ReceiptHandle,
    }).promise();
  }

  pollQueue(options);
}