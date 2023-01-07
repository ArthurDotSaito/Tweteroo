import express from "express";
import cors from 'cors';

const TWEETS = [];
const USERS = [];
const PORT = 5000;
const server = express();
server.use(cors());
server.use(json());

server.listen(5000, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
  })