import express from "express";
import cors from 'cors';

const TWEETS = [];
const USERS = [];
const PORT = 5000;
const server = express();
server.use(cors());
server.use(json());

server.post("/sign-up", (req, res) =>{
    const userData = req.body

    USERS.push(userData);
    return res.sendStatus(200).send("OK!");
})

server.post("/tweets", (req, res) => {
    const {username} = req.headers;
    const {tweet} = req.body;

    if(USERS.find((e) => e.username === username)) return res.sendStatus(401).send("UNAUTHORIZED");
})

server.listen(5000, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
  })