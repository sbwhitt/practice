import cors from 'cors';
import express from 'express';
import { getUsers, createUser, deleteUser, updateUser } from './models/userModel';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send("hello");
});

app.get('/users', (req, res) => {
  getUsers()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});

app.post('/users', (req, res) => {
  createUser(req.body)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});

app.delete('/users/:id', (req, res) => {
  deleteUser(req.params.id)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});

app.put('/users/:id', (req, res) => {
  updateUser(req.params.id, req.body)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
