const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'test',
  secretAccessKey: 'test',
  endpoint: 'http://localstack:4566'
});

const sns = new AWS.SNS();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const formHTML = `
    <form action="/publish" method="post">
      <label for="name">Nome:</label>
      <input type="text" id="name" name="name"><br><br>

      <label for="email">Email:</label>
      <input type="text" id="email" name="email"><br><br>

      <input type="submit" value="Enviar">
    </form>
  `;

  res.send(formHTML);
});

app.post('/publish', async (req, res) => {
  const { name, email } = req.body;
  
  const params = {
    Message: JSON.stringify({ name, email }),
    TopicArn: 'arn:aws:sns:us-east-1:000000000000:NovoClienteTopic'
  };

  try {
    await sns.publish(params).promise();
    res.send('Mensagem publicada com sucesso.');
  } catch (error) {
    console.error('Erro ao publicar mensagem:', error);
    res.status(500).send('Erro ao publicar mensagem.');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
