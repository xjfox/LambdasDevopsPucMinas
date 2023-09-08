const { sqs, sns } = require('../services');

module.exports = async (options) => {
  const { sqsQueueName, snsTopicArn } = options;
  console.log('ensureQueueExistsAndSubscribe => ', sqsQueueName, snsTopicArn);
  let queueUrl;
  
  try {
    const { QueueUrl } = await sqs.getQueueUrl({ QueueName: sqsQueueName }).promise();
    queueUrl = QueueUrl;
  } catch (error) {
    if (error.code === 'AWS.SimpleQueueService.NonExistentQueue') {
      const { QueueUrl } = await sqs.createQueue({ QueueName: sqsQueueName }).promise();
      queueUrl = QueueUrl;
    } else {
      throw error;
    }
  }

  const { Attributes } = await sqs.getQueueAttributes({
    QueueUrl: queueUrl,
    AttributeNames: ['QueueArn']
  }).promise();

  const queueArn = Attributes.QueueArn;

  await sns.subscribe({
    Protocol: 'sqs',
    TopicArn: snsTopicArn,
    Endpoint: queueArn
  }).promise();
}
