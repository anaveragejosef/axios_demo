const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
let dogCount = 3;
let catCount = 3;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.listen(port, () => console.log(`Now listening on port ${port}`));

app.get('/dogs', (req, res) => {
  res.status(200).send(dogCount.toString());
});

app.get('/cats', (req, res) => {
  res.status(200).send(catCount.toString());
});

app.post('/dogs', (req, res) => {
  console.log('REQ - ', req);
  console.log('REQ BODY - ', req.body);
  console.log('REQ BODY AMOUNT - ', req.body.amount);
  let { amount } = req.body;
  dogCount = Number(amount);
  res.status(201).send();
})

app.post('/cats', (req, res) => {
  let { amount } = req.body;
  catCount = Number(amount);
  res.status(201).send();
})

app.post('/dogs/:amount', (req, res) => {
  let { amount } = req.params;
  dogCount = Number(amount);
  res.status(201).send();
})

app.post('/cats/:amount', (req, res) => {
  let { amount } = req.params;
  catCount = Number(amount);
  res.status(201).send();
})
