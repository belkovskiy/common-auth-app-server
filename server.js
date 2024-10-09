const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

const users = [];

app.use(cors());
app.use(bodyParser.json());


app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  console.log(email + ": " + password);
  users.push({ email, password: hashedPassword});
  res.status(201).send({ message: "User Registered!" });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({ message: "Incorrect user data!" });
  }
  const token = jwt.sign({ email }, 'secret', { expiresIn: 86400});
  res.status(200).send({ token });
});

app.listen(5000, () => {
  console.log("Server is running at port: " + 5000);
});
