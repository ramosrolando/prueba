const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configura body-parser para procesar los datos entrantes como JSON
app.use(bodyParser.json());

// Ruta para la webhook de Facebook
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(entry => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
      // Aquí puedes agregar tu lógica de negocio para procesar los eventos de la webhook de Facebook
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// Ruta de verificación para la webhook de Facebook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === 'tu_token_de_verificación') {
      console.log('Webhook verificado');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(404);
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
