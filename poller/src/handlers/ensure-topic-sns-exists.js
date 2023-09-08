const { sns } = require('../services');

module.exports = async function ensureTopicSnsExists(options) {
  const { snsTopicName } = options;
  console.log('ensureTopicSnsExists => ', snsTopicName);
    
  let topicArn;
  
  try {
    const { Topics } = await sns.listTopics().promise();
    
    const topic = Topics.find(t => t.TopicArn.split(':').pop() === snsTopicName);

    if (topic) {
      topicArn = topic.TopicArn;
    } else {
      throw new Error('TopicNotFound');
    }

  } catch (error) {
    if (error.message === 'TopicNotFound') {
      const { TopicArn } = await sns.createTopic({ Name: snsTopicName }).promise();
      topicArn = TopicArn;
    } else {
      throw error;
    }
  }

  return topicArn;
}