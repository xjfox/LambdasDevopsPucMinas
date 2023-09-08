const { SNS } = require('aws-sdk');
const { awsConfig } = require('./config/aws-config');

const LOCALSTACK_ENDPOINT = process.env.LOCALSTACK_ENDPOINT || 'http://localstack:4566'

const sns = new SNS({
  ...awsConfig,
  endpoint: LOCALSTACK_ENDPOINT
});

module.exports = sns;
