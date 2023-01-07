import express from "express";
import cors from 'cors';

const TWEETS = [];
const USERS = [];
const PORT = 5000;
const MAXTWEETS = 10;
const server = express();
server.use(cors());
server.use(express.json());

server.post("/sign-up", (req, res) =>{
    const userData = req.body
    if(!userData.username || !userData.avatar) return res.status(400).send("Todos os campos são obrigatórios!")

    USERS.push(userData);
    return res.sendStatus(200);
})

server.get("/tweets", (req, res) => {
    const page = req.query.page ? Number(req.query.page):1;
    const tweets = [];
    const max = TWEETS.length < MAXTWEETS * page ? TWEETS.length : MAXTWEETS * page;
    const min = (MAXTWEETS * (page - 1)) + 0;
    console.log(USERS);

    if(page < 1) return res.status(400).send("Informe uma página válida!");
    for(let i = min; i < max; i++){
        tweets.push({
            ...TWEETS[i], avatar: USERS.find(element => element.username === TWEETS[i].username).avatar
        })
    }
    return res.send(tweets);
})

server.post("/tweets", (req, res) => {
    const {username} = req.headers;
    const {tweet} = req.body;
    if(USERS.find((e) => e.username === username)) return res.sendStatus(401).send("UNAUTHORIZED");
    TWEETS.push({
        username,
        tweet: tweet.tweet,
        id: TWEETS.length + 1});
    res.status(201).send("CREATED");
})

server.listen(5000, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
  })