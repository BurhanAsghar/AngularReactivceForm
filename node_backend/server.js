const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

let users = [];

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).send(user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
