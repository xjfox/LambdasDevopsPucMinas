const { Lambda } = require('aws-sdk');
const { awsConfig } = require('./config/aws-config');

const LAMBDA_HOST = process.env.LAMBDA_HOST;

const lambda = new Lambda({
  ...awsConfig,
  endpoint: LAMBDA_HOST,
  sslEnabled: false,
  region: 'us-east-1',
  httpOptions: {
      rejectUnauthorized: false
  }
});

module.exports = lambda;
